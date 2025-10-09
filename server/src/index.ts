import dotenv from "dotenv";
dotenv.config();
import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./types/express/index.ts";
import connectDB from "./db/config/db.ts";
import userRoute from "./routes/user/user.ts";
import taskRoute from "./routes/task/task.ts";

const app: Express = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api", userRoute);
app.use("/api", taskRoute);

const main = async () => {
  try {
    console.log("Starting server...");
    console.log("Environment variables:", {
      DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Missing",
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ? "Set" : "Missing",
      PORT: PORT,
    });

    await connectDB();
    app.listen(PORT, () => {
      console.log("Database is connected");
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

main();
