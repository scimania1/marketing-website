import { z } from "zod";
import mongoose from "mongoose";

const productZodSchema = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId),
  id: z.number(),
  name: z.string(),
  sizes: z.array(z.string()),
  material: z.array(z.string()),
  finishing: z.array(z.string()),
  minQty: z.number(),
  hardening: z.string(),
  tags: z.array(z.string()),
  imageURL: z.string().url(),
  keywords: z.array(z.string()),
});

export type Product = z.infer<typeof productZodSchema>;

const productsSchema = new mongoose.Schema<Product>(
  {
    id: { type: Number },
    name: { type: String, required: true },
    sizes: { type: [String] },
    material: { type: [String], required: true },
    finishing: { type: [String], required: true },
    minQty: { type: Number, required: true },
    hardening: {
      type: String,
      required: true,
      default: "as per customer's requirement",
    },
    tags: { type: [String], required: true },
    imageURL: { type: String, required: true },
    keywords: { type: [String] },
  },
  { collection: process.env.MONGODB_COLLECTION || "" },
);

// make a singleton
export const Products =
  (mongoose.models.Products as mongoose.Model<Product>) ||
  mongoose.model<Product>("Products", productsSchema);
