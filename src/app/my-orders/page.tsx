import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrderPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-5 px-5">
      <h1 className="font-bold md:text-xl">Meus pedidos</h1>
      <Orders
        orders={orders.map((order) => ({
          id: order.id,
          status: order.status,
          totalPriceInCents: order.totalPriceInCents,
          createdAt: order.createdAt,
          items: order.items.map((item) => ({
            id: item.id,
            imageUr: item.productVariant.imageUrl,
            productName: item.productVariant.product?.name,
            productVariantName: item.productVariant.name,
            priceInCents: item.priceInCents,
            quantity: item.quantity,
          })),
        }))}
      />
    </div>
  );
};

export default MyOrderPage;
