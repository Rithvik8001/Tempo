// Auth middleware
import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User } from "../db/models/user.ts";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "User is not logged in.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload & { userId: string };

    const { userId } = decoded;

    const user = await User.findById(userId).select("userName email");
    if (!user) {
      return res.status(401).json({
        message: "Invalid authentication",
      });
    }

    req.user = {
      userId: user._id.toString(),
      userName: user.userName,
      email: user.email,
    };
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
};
