import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(10, {message: "Title must contain at least 10 character(s)"}),
  description: z.string().min(30, {message: "Description must contain at least 30 character(s)"}).max(250),
  price: z.number(),
  tag: z.string(),
});
