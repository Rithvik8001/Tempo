import { type Request, type Response } from "express";
import { User } from "../../db/models/user.ts";

export const userProfile = async (req: Request, res: Response) => {
  const { userId } = req.user ?? {};
  if (!userId) {
    return res.status(401).json({
      message: "User is not authenticated.",
    });
  }

  try {
    const profile = await User.findById(userId).select("-password");
    if (!profile) {
      return res.status(404).json({
        message: "User profile not found.",
      });
    }

    return res.status(200).json({
      message: "User profile retrieved successfully.",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user profile.",
    });
  }
};
