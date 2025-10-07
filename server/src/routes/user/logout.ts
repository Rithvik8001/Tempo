import { Router } from "express";
import { logoutUser } from "../../controllers/user/logoutUser.ts";

const route: Router = Router();

route.use("/logout", logoutUser);

export default route;
