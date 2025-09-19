import z, { uuid } from "zod";

export const decreaseCartProductQuatitySchema = z.object({
  cartItemId: uuid(),
});

export type DecreaseCartProductQuatitySchema = z.infer<
  typeof decreaseCartProductQuatitySchema
>;
