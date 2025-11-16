"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateChechoutSessionSchema,
  createCheckoutSessionSchema,
} from "./schema";

export const createChechoutSession = async (
  data: CreateChechoutSessionSchema,
) => {
  createCheckoutSessionSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { orderId } = createCheckoutSessionSchema.parse(data);

  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });
  if (!order) {
    throw new Error("order not found!");
  }

  if (order.userId != session.user.id) {
    throw new Error("Unauthorized");
  }

  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  });

  if (!orderItems) {
    throw new Error("Unauthorized");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${orderItem.productVariant.product?.name} -${orderItem.productVariant.name}`,
            description: orderItem.productVariant.product?.description,
            images: [orderItem.productVariant.imageUrl],
          },
          unit_amount: orderItem.priceInCents,
        },
        quantity: orderItem.quantity,
      };
    }),
  });
  return checkoutSession;
};
