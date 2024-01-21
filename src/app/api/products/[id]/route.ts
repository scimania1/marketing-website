import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Product, Products } from "@/lib/products-model";
import redis from "@/lib/redis";
import connectDb from "@/lib/connect-db";
import { EXPIRE_TIME } from "@/lib/constants";

export async function GET(
  _: NextRequest,
  { params: id }: { params: { id: { id: string } } },
) {
  // invalid ID
  const _id = id.id;
  if (!mongoose.isValidObjectId(_id)) {
    return Response.json({ success: false, message: "Invalid Product Id" });
  }
  // get data from redis if it exists
  const data: Product[] | null = await redis.json.get(
    `products:id:${_id}`,
    "$",
  );
  if (data) {
    return Response.json(data[0]);
  }
  try {
    await connectDb();
  } catch (err) {
    console.error("[ERROR] Failed to Connect to Database", err);
    return Response.json({
      success: false,
      message: "Couldn't connect to database",
    });
  }
  const productData = await Products.findById(_id).lean();
  if (!productData) {
    return Response.json({ success: false, message: "Failure" });
  }
  const tx = redis.multi();
  tx.json.set(`products:id:${id}`, "$", JSON.stringify(productData));
  tx.expire(`products:id:${id}`, EXPIRE_TIME, "NX");
  await tx.exec();
  return Response.json(productData);
}
