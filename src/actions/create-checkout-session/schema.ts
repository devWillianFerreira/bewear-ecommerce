import z from "zod";

export const createCheckoutSessionSchema = z.object({
  orderId: z.uuid(),
});
export type CreateChechoutSessionSchema = z.infer<
  typeof createCheckoutSessionSchema
>;
