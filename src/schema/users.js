import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Must be 3 or more characters long"),
  email: z.string().email({message: "Invalid email address"}),
  password: z.string().min(6, "Password is too short")
});


export const loginSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
  password: z.string().min(6, "Password is too short")
});
