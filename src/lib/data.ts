import { cache } from "react";
import connectDb from "./connect-db";
import { Product, Products } from "./products-model";
import redis from "@/lib/redis";
import mongoose from "mongoose";
import { DEFAULT_LIMIT, EXPIRE_TIME } from "./constants";

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

export type ProductProjected = {
  _id: mongoose.Types.ObjectId;
  name: string;
  sizes: string;
  material: string;
  imageURL: string;
};

export const fetchAllProducts = cache(
  async (page: number, categories: string[]) => {
    // check data inside redis and return the data if it exists.
    // then connect to mongodb.
    const redisKey = `products:category:${concatCategories(categories)}`;
    const data: ProductProjected[] | null = await redis.hget(
      redisKey,
      `page-${page}`,
    );
    if (data) {
      return data;
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
    ];

    let pipeline: mongoose.PipelineStage[];
    if (categories.length > 0) {
      pipeline = [...categoryPipeline, ...mainPipeline];
    } else {
      pipeline = mainPipeline;
    }

    const result: ProductProjected[] =
      await Products.aggregate(pipeline).exec();

    if (result.length > 0) {
      let categoryKey: string;
      if (categories.length > 0) {
        categoryKey = categories
          .map((category) => category.replaceAll(" ", "+"))
          .join("-");
      } else {
        categoryKey = "null";
      }
      await redis.hset(redisKey, {
        [`page-${page}`]: result,
      });
      return result;
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
    const data: ProductProjected[] | null = await redis.hget(
      redisKey,
      `page-${page}`,
    );
    if (data) {
      return data;
    }
    try {
      await connectDb();
    } catch (err) {
      console.error("[ERROR] Failed to Connect to Database", err);
      return null;
    }
    const skip = (page - 1) * DEFAULT_LIMIT;
    let options: { [operator: string]: any } = {
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
    };
    if (categories.length > 0) {
      const categoryString = categories.join(" AND ");
      options.compound.filter = [
        { queryString: { defaultPath: "tags", query: categoryString } },
      ];
    }
    const result: ProductProjected[] = await Products.aggregate()
      .search(options)
      .skip(skip)
      .limit(DEFAULT_LIMIT)
      .addFields({ size: { $first: "$sizes" } })
      .addFields({ mat: { $first: "$material" } })
      .project({
        _id: 1,
        name: 1,
        imageURL: 1,
        sizes: "$size",
        material: "$material",
      });
    if (result.length) {
      await redis.hset(redisKey, {
        [`page-${page}`]: result,
      });
    }
    return result;
  },
);

export const fetchAllProductsCount = cache(async (categories: string[]) => {
  const redisKey = `products:category:${concatCategories(categories)}`;
  const data = await redis.hget(redisKey, "count");
  if (data) {
    return Number(data);
  }
  try {
    await connectDb();
  } catch (err) {
    console.error("[ERROR] Failed to Connect to Database", err);
    return null;
  }
  let count: number;
  if (categories.length > 0) {
    count = await Products.countDocuments({ tags: { $all: categories } });
  } else {
    count = await Products.countDocuments({});
  }
  await redis.hset(redisKey, {
    count: count,
  });
  return count;
});

export const fetchFilteredProductsCount = cache(
  async (query: string, categories: string[]) => {
    const redisKey = `products:query:${query}:category:${concatCategories(
      categories,
    )}`;
    const data: string | null = await redis.hget(redisKey, "count");
    if (data) {
      return Number(data);
    }
    try {
      await connectDb();
    } catch (err) {
      console.error("[ERROR] Failed to Connect to Database", err);
      return null;
    }
    let pipeline: any = [
      {
        $searchMeta: {
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
          count: { type: "total" },
          returnStoredSource: true,
        },
      },
    ];
    if (categories.length > 0) {
      const categoryString = categories.join(" AND ");
      pipeline[0].$searchMeta.compound.filter = [
        { queryString: { defaultPath: "tags", query: categoryString } },
      ];
    }
    const result: { count: { total: number } }[] =
      await Products.aggregate(pipeline);
    if (result[0].count.total !== 0) {
      await redis.hset(redisKey, {
        count: result[0].count.total,
      });
    }
    return result[0].count.total;
  },
);
