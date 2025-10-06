import { z } from "zod";

export const validateSignup = z
  .object({
    userName: z
      .string()
      .trim()
      .min(4, { message: "Username is required" })
      .min(4, { message: "User name cannot be less than 4 characters" })
      .max(12, { message: "Username cannot be more than 12 characters" }),

    email: z
      .email({ message: "Enter a valid email address." })
      .trim()
      .min(1, { message: "Email is required." }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
  })
  .strict();

export type signupData = z.infer<typeof validateSignup>;

export const signupValidation = (payload: unknown) => {
  const result = validateSignup.safeParse(payload);
  return result;
};

export default signupValidation;
