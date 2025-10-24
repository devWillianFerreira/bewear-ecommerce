"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { success } from "zod";

import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where:
      eq(shippingAddressTable.id, data.shippingAddressId) &&
      eq(shippingAddressTable.userId, session.user.id),
  });

  if (!shippingAddress) {
    throw new Error("shipping Address not found!");
  }
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
  });

  if (!cart) {
    throw new Error("Cart not found!");
  }

  await db
    .update(cartTable)
    .set({ shippingAddressId: data.shippingAddressId })
    .where(eq(cartTable.id, cart.id));

  return { success: true };
};

export default updateCartShippingAddress;
