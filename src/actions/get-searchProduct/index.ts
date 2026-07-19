"use server";

import { eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";

import { SearchProductsSchema, searchProductsSchema } from "./schema";

export const searchProducts = async (data: SearchProductsSchema) => {
  searchProductsSchema.parse(data);

  const products = await db.query.productTable.findMany({
    where: ilike(productTable.name, data.search),
    with: {
      variants: true,
    },
    limit: 10,
  });

  return products;
};
