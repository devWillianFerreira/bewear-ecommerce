"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  RemoveProductFromCartSchema,
  removeProductFromCartSchema,
} from "./schema";

export const removeProductFromCart = async (
  data: RemoveProductFromCartSchema,
) => {
  removeProductFromCartSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: eq(cartItemTable.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  if (!cartItem) {
    throw new Error("Product not found!");
  }

  const cartDoesNotBelongToUser = cartItem?.cart.userId !== session.user.id;

  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, data.cartItemId));
};
