"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { toast } from "sonner";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const getAddress = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("unauthorized");
  }

  try {
    const address = await db.query.shippingAddressTable.findMany({
      where: eq(shippingAddressTable.userId, session.user.id),
      orderBy: shippingAddressTable.createdAt,
    });

    return address;
  } catch (error) {
    toast.error("Erro ao buscar os endereços");
    console.log("Erro ao buscar endereço:", error);
  }
};

export default getAddress;
