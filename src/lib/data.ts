import { cache } from "react";
import connectDb from "./connect-db";
import { Product, Products } from "./products-model";
import redis from "@/lib/redis";
import mongoose from "mongoose";
import { DEFAULT_LIMIT, EXPIRE_TIME } from "./constants";

let allProductsCount = 0;
let filteredProductsCount = 0;

export type ProductProjected = {
  _id: mongoose.Types.ObjectId;
  name: string;
  sizes: string;
  material: string;
  imageURL: string;
};

function concatCategories(categories: string[]) {
  if (!categories.length) {
    return "null";
  }
  return categories
    .map((category) => category.toLowerCase().replaceAll(" ", "+"))
    .join("&");
}

/** @description `fetchTags` returns a `Promise<null>` if there was a connection error and `Promise<string[]>` otherwise */
export const fetchTags = cache(async () => {
  // fetch data from redis first to check if there is any cache. Store the tags in a set inside redis
  // as we only have 12 categories for now, we can just use smembers.
  const data = await redis.smembers<string[]>("products:tags");
  if (data.length > 0) {
    return data;
  }
  try {
    await connectDb();
  } catch (err) {
    console.error("[ERROR] Failed to Connect to Database", err);
    return null;
  }
  const tags = await Products.distinct("tags").lean();
  const tx = redis.multi();
  tx.sadd("products:tags", ...tags);
  tx.expire("products:tags", EXPIRE_TIME, "NX");
  await tx.exec();
  return tags;
});

export const fetchProductById = cache(async (_id: string) => {
  // invalid ID
  if (!mongoose.isValidObjectId(_id)) {
    return null;
  }
  // get data from redis if it exists
  const data: Product[] | null = await redis.json.get(
    `products:id:${_id}`,
    "$",
  );
  if (data) {
    return data[0];
  }
  try {
    await connectDb();
  } catch (err) {
    console.error("[ERROR] Failed to Connect to Database", err);
    return null;
  }
  const productData = await Products.findById(_id).lean();
  if (!productData) {
    return null;
  }
  const tx = redis.multi();
  tx.json.set(`products:id:${_id}`, "$", JSON.stringify(productData));
  tx.expire(`products:id:${_id}`, EXPIRE_TIME, "NX");
  await tx.exec();
  return productData;
});

export const fetchAllProducts = cache(
  async (page: number, categories: string[]) => {
    // check data inside redis and return the data if it exists.
    // then connect to mongodb.
    const redisKey = `products:category:${concatCategories(categories)}`;
    const res = await redis.hmget(redisKey, `page-${page}`, `count`);
    // if (data) {
    //   return data;
    // }
    if (res && res[`page-${page}`] && res.count) {
      allProductsCount = Number(res.count);
      return res[`page-${page}`] as ProductProjected[];
    }
    try {
      await connectDb();
    } catch (err) {
      console.error("[ERROR] Failed to Connect to Database", err);
      return null;
    }

    const skip = (page - 1) * DEFAULT_LIMIT;

    const categoryPipeline: mongoose.PipelineStage[] = [
      { $match: { tags: { $all: categories } } },
    ];

    const mainPipeline: mongoose.PipelineStage[] = [
      { $sort: { id: 1 } },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: DEFAULT_LIMIT },
            { $addFields: { size: { $first: "$sizes" } } },
            { $addFields: { mat: { $first: "$material" } } },
            {
              $project: {
                _id: 1,
                name: 1,
                imageURL: 1,
                sizes: "$size",
                material: "$mat",
              },
            },
          ],
          count: [{ $count: "count" }],
        },
      },
    ];

    let pipeline: mongoose.PipelineStage[];
    if (categories.length > 0) {
      pipeline = [...categoryPipeline, ...mainPipeline];
    } else {
      pipeline = mainPipeline;
    }

    const result: { data: ProductProjected[]; count: { count: number }[] }[] =
      await Products.aggregate(pipeline).exec();

    if (result[0].count[0]) {
      allProductsCount = result[0].count[0].count;
    } else {
      allProductsCount = 0;
    }

    if (result[0].data.length > 0) {
      let categoryKey: string;
      if (categories.length > 0) {
        categoryKey = categories
          .map((category) => category.replaceAll(" ", "+"))
          .join("-");
      } else {
        categoryKey = "null";
      }
      await redis.hset(redisKey, {
        [`page-${page}`]: result[0].data,
        count: result[0].count[0].count,
      });
      return result[0].data;
    }
    return null;
  },
);

export const fetchFilteredProducts = cache(
  async (page: number, query: string, categories: string[]) => {
    // mongodb
    const redisKey = `products:query:${query}:category:${concatCategories(
      categories,
    )}`;
    const res = await redis.hmget(redisKey, `page-${page}`, "count");
    if (res && res[`page-${page}`] && res.count) {
      filteredProductsCount = Number(res.count);
      return res[`page-${page}`] as ProductProjected[];
    }
    // if (data) {
    //   return data;
    // }
    try {
      await connectDb();
    } catch (err) {
      console.error("[ERROR] Failed to Connect to Database", err);
      return null;
    }
    const skip = (page - 1) * DEFAULT_LIMIT;
    let pipeline: any[] = [
      {
        $search: {
          index: "filterProducts",
          compound: {
            should: [
              {
                autocomplete: {
                  query: query,
                  path: "name",
                  fuzzy: {
                    maxEdits: 1,
                  },
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "keywords",
                  fuzzy: {
                    maxEdits: 1,
                  },
                },
              },
            ],
          },
          returnStoredSource: true,
        },
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: DEFAULT_LIMIT },
            { $addFields: { size: { $first: "$sizes" } } },
            { $addFields: { mat: { $first: "$material" } } },
            {
              $project: {
                _id: 1,
                name: 1,
                imageURL: 1,
                sizes: "$size",
                material: "$mat",
              },
            },
          ],
          count: [{ $count: "count" }],
        },
      },
    ];
    if (categories.length > 0) {
      const categoryString = categories
        .map((category) => `"${category}"`)
        .join(" AND ");
      pipeline = [
        {
          $search: {
            index: "filterProducts",
            compound: {
              filter: [
                { queryString: { defaultPath: "tags", query: categoryString } },
                {
                  compound: {
                    should: [
                      {
                        autocomplete: {
                          query: query,
                          path: "name",
                          fuzzy: {
                            maxEdits: 1,
                          },
                        },
                      },
                      {
                        autocomplete: {
                          query: query,
                          path: "keywords",
                          fuzzy: {
                            maxEdits: 1,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
            returnStoredSource: true,
          },
        },
        {
          $facet: {
            data: [
              { $skip: skip },
              { $limit: DEFAULT_LIMIT },
              { $addFields: { size: { $first: "$sizes" } } },
              { $addFields: { mat: { $first: "$material" } } },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  imageURL: 1,
                  sizes: "$size",
                  material: "$mat",
                },
              },
            ],
            count: [{ $count: "count" }],
          },
        },
      ];
    }
    try {
      const result: { data: ProductProjected[]; count: { count: number }[] }[] =
        await Products.aggregate(pipeline).exec();
      if (result[0].count[0]) {
        filteredProductsCount = result[0].count[0].count;
      } else {
        filteredProductsCount = 0;
      }
      if (result[0].data.length) {
        await redis.hset(redisKey, {
          [`page-${page}`]: result[0].data,
          count: result[0].count[0].count,
        });
      }
      return result[0].data;
    } catch (error) {
      console.error(
        "[ERROR] Some error occured inside the fetchFilteredProducts aggregation",
        error,
      );
      return null;
    }
  },
);

export const fetchAllProductsCount = cache(
  async (page: number, categories: string[]) => {
    // const redisKey = `products:category:${concatCategories(categories)}`;
    // const data = await redis.hget(redisKey, "count");
    // if (data) {
    //   return Number(data);
    // }
    await fetchAllProducts(page, categories);
    const count = allProductsCount;
    // console.log("fetchAllProductsCount ran with value of ", { count });
    // await redis.hset(redisKey, {
    //   count: count,
    // });
    return count;
  },
);

export const fetchFilteredProductsCount = cache(
  async (page: number, query: string, categories: string[]) => {
    // const redisKey = `products:query:${query}:category:${concatCategories(
    //   categories,
    // )}`;
    // const data: string | null = await redis.hget(redisKey, "count");
    // if (data) {
    //   return Number(data);
    // }
    await fetchFilteredProducts(page, query, categories);
    const count = filteredProductsCount;
    // if (count !== 0) {
    //   await redis.hset(redisKey, {
    //     count: count,
    //   });
    // }
    return count;
  },
);

export const fetchAllProductIds = cache(async () => {
  try {
    await connectDb();
  } catch (err) {
    console.error("[ERROR] Failed to Connect to Database", err);
    return null;
  }
  const ids = await Products.find({}).select("_id").lean();
  return ids;
});

type RelatedProducts = {
  _id: mongoose.Types.ObjectId;
  name: string;
  imageURL: string;
};

export const fetchRelatedProducts = cache(
  async (id: string, categories: string[]) => {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const _id = new mongoose.Types.ObjectId(id);
    try {
      await connectDb();
    } catch (err) {
      console.error("[ERROR] Failed to Connect to Database", err);
      return null;
    }

    const res: RelatedProducts[] = await Products.aggregate([
      {
        $match: {
          $and: [{ _id: { $ne: _id } }, { tags: { $in: categories } }],
        },
      },
      { $sample: { size: 10 } },
      {
        $project: {
          _id: 1,
          name: 1,
          imageURL: 1,
        },
      },
    ]);

    if (!res.length) {
      return null;
    }
    return res;
  },
);
