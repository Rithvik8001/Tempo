import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
