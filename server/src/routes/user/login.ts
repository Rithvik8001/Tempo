import { Router } from "express";
import { loginUser } from "../../controllers/user/loginUser.ts";

const route: Router = Router();

route.post("/login", loginUser);

export default route;
