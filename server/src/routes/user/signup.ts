import { Router } from "express";
import { signupUser } from "../../controllers/user/signupUser.ts";

const route: Router = Router();

route.post("/signup", signupUser);

export default route;
