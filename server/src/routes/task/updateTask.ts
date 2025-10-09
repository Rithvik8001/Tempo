import { Router } from "express";
import { updateTask } from "../../controllers/task/updateTask.ts";
import { authMiddleware } from "../../middlewares/auth.ts";

const route: Router = Router();

route.put("/update/:id", authMiddleware, updateTask);

export default route;
