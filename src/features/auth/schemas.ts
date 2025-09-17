import { z } from "zod";

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(3, "Minimum 3 characters required"),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Required"),
    email: z.email(),
    password: z.string().min(3, "Minimum 3 characters required"),
    confirmPassword: z.string().min(3, "Minimum 3 characters required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });
