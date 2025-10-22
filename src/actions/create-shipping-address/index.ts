"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "./schema";

const createShippingAddress = async (data: CreateShippingAddressSchema) => {
  createShippingAddressSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("unauthorized");
  }

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.fullName,
      email: data.email,
      phone: data.phone,
      cpfOrCnpj: data.cpf,
      street: data.address,
      number: data.number,
      zipCode: data.zipCode,
      city: data.city,
      country: "Brasil",
      neighborhood: data.neighborhood,
      state: data.state,
      complement: data.complement,
    })
    .returning();
  revalidatePath("/cart/identification");

  return shippingAddress;
};

export default createShippingAddress;
