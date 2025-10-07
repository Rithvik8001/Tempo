import { Router } from "express";
import { userProfile } from "../../controllers/user/userProfile.ts";
import { authMiddleware } from "../../middlewares/auth.ts";

const route: Router = Router();

route.get("/profile", authMiddleware, userProfile);

export default route;
