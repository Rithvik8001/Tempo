import dotenv from "dotenv";
dotenv.config();
import express, { type Express } from "express";
import connectDB from "./db/config/db.js";
const app: Express = express();
const PORT = process.env.PORT ?? 3000;

const main = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Database is connected");
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
