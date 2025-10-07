import { Router } from "express";
import signup from "./signup.ts";
import login from "./login.ts";

const route: Router = Router();

route.use("/auth", signup);
route.use("/auth", login);

export default route;
