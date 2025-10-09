import { Router } from "express";
import { createTask } from "../../controllers/task/createTask.ts";
import { authMiddleware } from "../../middlewares/auth.ts";

const route: Router = Router();

route.post("/create", authMiddleware, createTask);

export default route;
