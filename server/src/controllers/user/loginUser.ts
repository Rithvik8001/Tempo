import { type Request, type Response } from "express";
import loginValidation from "../../validators/login.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../db/models/user.ts";

export const loginUser = async (req: Request, res: Response) => {
  const result = loginValidation(req.body);
  if (!result.success) {
    const error = result.error;
    return res.status(400).json({
      message: error.message,
    });
  }

  const { email, password } = result.data;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      message: "No account is found with this email address.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password.",
    });
  }

  const data = {
    userId: user._id,
    userName: user.userName,
    email: user.email,
  };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 8 * 3600000),
  });

  return res.status(200).json({
    message: "Login successful.",
    data,
  });
};
