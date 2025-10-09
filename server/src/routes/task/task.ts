import { Router } from "express";
import getAllTasks from "./getAllTasks.ts";
import createTask from "./createTask.ts";
import updateTask from "./updateTask.ts";
import deleteTask from "./deleteTask.ts";

const route: Router = Router();

route.use("/task", getAllTasks);
route.use("/task", createTask);
route.use("/task", deleteTask);
route.use("/task", updateTask);

export default route;
