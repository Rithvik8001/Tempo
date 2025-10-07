import { Router } from "express";
import signup from "./signup.ts";
import login from "./login.ts";
import logout from "./logout.ts";

const route: Router = Router();

route.use("/auth", signup);
route.use("/auth", login);
route.use("/auth", logout);

export default route;
