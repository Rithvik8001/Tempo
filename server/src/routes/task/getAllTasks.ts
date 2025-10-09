import { Router } from "express";
import { getAllTasks } from "../../controllers/task/getAllTasks.ts";
import { authMiddleware } from "../../middlewares/auth.ts";

const route: Router = Router();

route.use("/all", authMiddleware, getAllTasks);

export default route;
