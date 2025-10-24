import z from "zod";

export const updateCartShippingAddressSchema = z.object({
  shippingAddressId: z.string(),
});

export type UpdateCartShippingAddressSchema = z.infer<
  typeof updateCartShippingAddressSchema
>;
