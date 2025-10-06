import { Router } from "express";
import signup from "./signup.ts";

const route: Router = Router();

route.use("/auth", signup);
export default route;
