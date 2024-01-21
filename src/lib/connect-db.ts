import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (MONGODB_URI.length === 0) {
  throw new Error(
    "[ERROR] Failed to connect to mongodb. Define MONGODB_URI inside .env",
  );
}

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || "";

if (MONGODB_COLLECTION.length === 0) {
  throw new Error(
    "[ERROR] Failed to connect to mongodb. Define MONGODB_COLLECTION inside .env",
  );
}

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDb;
