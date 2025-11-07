import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import OrderSteps from "../components/order-steps";
import YourOrders from "../components/your-orders";
import { formatAddress } from "../helpers/address";

const Confirmation = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
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

  if (!cart) {
    redirect("/");
  }

  if (!cart.shippingAddress) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div className="space-y-5">
      <OrderSteps hasIdentification={true} hasPayment={true} />
      <div className="grid grid-cols-1 items-start gap-5 px-5 lg:grid-cols-[2fr_1fr]">
        <div>
          <Card>
            <CardHeader>
              <h1 className="text-xl font-semibold">Pagamento</h1>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-between gap-4 rounded-md border p-3 md:flex-row">
                <p className="text-muted-foreground">Identificação</p>
                {formatAddress(cart.shippingAddress)}
                <Link href="/cart/identification" className="underline">
                  <p>Alterar</p>
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full">Finalizar Compra</Button>
            </CardFooter>
          </Card>
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
              priceInCents: item.productVariant.priceInCents,
              variantName: item.productVariant.name,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
