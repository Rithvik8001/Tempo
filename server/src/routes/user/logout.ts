import { Router } from "express";
import { logoutUser } from "../../controllers/user/logoutUser.ts";

const route: Router = Router();

route.post("/logout", logoutUser);

export default route;
