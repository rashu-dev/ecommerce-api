import { z } from "zod";

export const cartSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const quantitySchema = z.object({
  quantity: z.number()
});
