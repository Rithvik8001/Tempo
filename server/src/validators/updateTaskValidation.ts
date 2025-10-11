import { z } from "zod";

export const validationUpdateTask = z
  .object({
    taskName: z
      .string()
      .min(1, { message: "taskName must contain at least 1 character." })
      .trim()
      .optional(),
    description: z.string().trim().optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (payload) =>
      payload.taskName !== undefined ||
      payload.description !== undefined ||
      payload.completed !== undefined,
    {
      message: "At least one field must be provided for update.",
      path: ["taskName"],
    }
  );

export type UpdateTaskData = z.infer<typeof validationUpdateTask>;

export const updateTaskValidation = (payload: unknown) => {
  const result = validationUpdateTask.safeParse(payload);
  return result;
};
