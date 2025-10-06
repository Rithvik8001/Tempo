import { type Request, type Response } from "express";
import signupValidation from "../../validators/signup.ts";
import { User } from "../../db/models/user.ts";
import bcrypt from "bcrypt";

export const signupUser = async (req: Request, res: Response) => {
  const result = signupValidation(req.body);
  if (!result.success) {
    const err = result.error;
    return res.status(400).json({
      message: err.message,
    });
  }

  const { userName, email, password } = result.data;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message:
          "An account with this email already exists. please try logging in instead.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created succesfully.",
      data: {
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server errror",
    });
  }
};
