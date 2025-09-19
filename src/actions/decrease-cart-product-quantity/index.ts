"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  DecreaseCartProductQuatitySchema,
  decreaseCartProductQuatitySchema,
} from "./schema";

export const decreaseCartProductQuantity = async (
  data: DecreaseCartProductQuatitySchema,
) => {
  decreaseCartProductQuatitySchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: eq(cartItemTable.id, data.cartItemId),
  });
  if (!cartItem) {
    throw new Error("Product not found!");
  }

  if (cartItem.quantity === 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, data.cartItemId));
    return;
  }
  await db
    .update(cartItemTable)
    .set({
      quantity: cartItem.quantity - 1,
    })
    .where(eq(cartItemTable.id, cartItem.id));
};
