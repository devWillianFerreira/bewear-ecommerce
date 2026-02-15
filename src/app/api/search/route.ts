import { eq, ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  if (!search) {
    return NextResponse.json([]);
  }
  const result = await db
    .select({
      id: productVariantTable.id,
      productName: productTable.name,
      productVariantName: productVariantTable.name,
      slug: productVariantTable.slug,
      imageUrl: productVariantTable.imageUrl,
      priceInCents: productVariantTable.priceInCents,
    })
    .from(productTable)
    .leftJoin(
      productVariantTable,
      eq(productVariantTable.productId, productTable.id),
    )
    .where(ilike(productTable.name, `%${search}%`))
    .limit(10);

  return NextResponse.json(result);
}
