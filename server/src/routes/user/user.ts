import { Router } from "express";
import signup from "./signup.ts";
import login from "./login.ts";
import logout from "./logout.ts";
import profile from "./profile.ts";

const route: Router = Router();

route.use("/auth", signup);
route.use("/auth", login);
route.use("/auth", logout);
route.use("/auth", profile);

export default route;
