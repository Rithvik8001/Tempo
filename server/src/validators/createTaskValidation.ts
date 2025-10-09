import { z } from "zod";

export const validationCreateTask = z.object({
  taskName: z.string().min(1, { message: "taskName is required" }).trim(),
  description: z.string().trim().optional(),
});

export type createTaskData = z.infer<typeof validationCreateTask>;

export const createTaskValidation = (payload: unknown) => {
  const result = validationCreateTask.safeParse(payload);
  return result;
};
