import { type Request, type Response } from "express";
import { isValidObjectId } from "mongoose";
import { updateTaskValidation } from "../../validators/updateTaskValidation.ts";
import { Task } from "../../db/models/task.ts";

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user ?? {};

  if (!userId) {
    return res.status(401).json({
      message: "User is not logged in.",
    });
  }

  if (!id || !isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid task id provided.",
    });
  }

  const result = updateTaskValidation(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Fields are incorrect.",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const payload = Object.fromEntries(
    Object.entries(result.data).filter(([, value]) => value !== undefined),
  );

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      payload,
      {
        new: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update task.",
    });
  }
};
