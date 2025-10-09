import { type Request, type Response } from "express";
import { User } from "../../db/models/user.ts";
import { Task } from "../../db/models/task.ts";

export const getAllTasks = async (req: Request, res: Response) => {
  const { userId } = req.user ?? {};
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "User is not authorized.",
      });
    }

    const userTasks = await Task.find({ userId });

    if (userTasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found for the user.",
        tasks: [],
      });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully.",
      tasks: userTasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
