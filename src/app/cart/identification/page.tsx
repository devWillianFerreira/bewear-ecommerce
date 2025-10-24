import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import OrderSteps from "../components/order-steps";
import Address from "./components/address";
import YourOrders from "./components/your-orders";

const Identification = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
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

  if (!cart || cart.items.length == 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  const shippingAdress = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });

  return (
    <div className="space-y-5 px-5">
      <OrderSteps hasIdentification={true} hasPayment={false} />
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 rounded-lg border p-3">
          <h1 className="text-xl font-semibold">Identificação</h1>
          <Address
            shippingAdresses={shippingAdress}
            defaultshippingAdressId={cart.shippingAddress?.id || null}
          />
        </div>

        <div className="h-auto rounded-lg border p-4">
          <h1 className="text-xl font-bold">Seu Pedido</h1>
          <YourOrders
            subTotalPriceInCents={cartTotalInCents}
            totalPriceInCents={cartTotalInCents}
            products={cart.items.map((item) => ({
              id: item.id,
              imageUrl: item.productVariant.imageUrl,
              name: item.productVariant.product?.name ?? "",
              variantName: item.productVariant.name,
              priceInCents: item.productVariant.priceInCents,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Identification;
