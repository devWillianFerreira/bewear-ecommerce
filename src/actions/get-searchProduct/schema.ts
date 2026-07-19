import z from "zod";

export const searchProductsSchema = z.object({
  search: z.string(),
});

export type SearchProductsSchema = z.infer<typeof searchProductsSchema>;
