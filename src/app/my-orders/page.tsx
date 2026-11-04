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
    <div className="flex min-h-[calc(100vh-300px)] flex-col space-y-5 px-5">
      <h1 className="font-bold md:text-xl">Meus pedidos</h1>
      {!orders.length && (
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <h1 className="font-semibold">
            Você ainda não realizou nenhum pedido. Explore nossa loja e encontre
            seus produtos favoritos!
          </h1>
        </div>
      )}
      {
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
      }
    </div>
  );
};

export default MyOrderPage;
