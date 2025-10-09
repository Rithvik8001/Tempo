import { type Request, type Response } from "express";
import { createTaskValidation } from "../../validators/createTaskValidation.ts";
import { Task } from "../../db/models/task.ts";

export const createTask = async (req: Request, res: Response) => {
  const { userId } = req.user ?? {};
  if (!userId) {
    return res.status(401).json({
      message: "User not logged in.",
    });
  }

  const result = createTaskValidation(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Fields are incorrect.",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { taskName, description } = result.data;

  try {
    const task = await Task.create({
      taskName,
      userId,
      ...(description ? { description } : {}),
    });

    return res.status(201).json({
      message: "Task has been created successfully.",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task.",
    });
  }
};
