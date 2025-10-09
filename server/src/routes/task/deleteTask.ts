import { Router } from "express";
import { deleteTask } from "../../controllers/task/deleteTask.ts";
import { authMiddleware } from "../../middlewares/auth.ts";

const route: Router = Router();

route.delete("/delete/:id", authMiddleware, deleteTask);

export default route;
