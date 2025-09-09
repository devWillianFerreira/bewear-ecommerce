import z, { uuid } from "zod";

export const addProductToCartSchema = z.object({
  variantId: z.uuid(),
  quantity: z.number().default(1),
});

export type AddProductToCartSchema = z.infer<typeof addProductToCartSchema>;
