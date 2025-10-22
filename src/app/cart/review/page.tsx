import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import Footer from "@/components/commom/footer";
import ProductList from "@/components/commom/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { cartTable, productTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import OrderSteps from "../components/order-steps";
import BagReview from "./components/bag-review";
import SummaryPrice from "./components/summary-price";

const Review = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    toast.error("Você precisa estar logado!!");
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
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

  if (!cart || cart.items.length == 0) {
    toast.error("Não há produtos no carrinho!");
    redirect("/");
  }

  if (!cart.items[0].productVariant.product?.categoryId) {
    toast.error("Não há produtos no carrinho!");
    redirect("/");
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(
      productTable.categoryId,
      cart.items[0].productVariant.product.categoryId,
    ),
    with: {
      variants: true,
    },
  });

  return (
    <div className="space-y-6">
      <OrderSteps hasIdentification={false} hasPayment={false} />

      <div className="grid grid-cols-1 items-start gap-5 px-5 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 rounded-lg border p-3">
          <h1 className="text-xl font-semibold">Sacola</h1>
          <BagReview />

          <Link href="/">
            <h3 className="font-semibold underline">Continuar comprando</h3>
          </Link>
        </div>
        <div className="h-auto space-y-6 rounded-lg border p-4">
          <h1 className="text-xl font-semibold">Resumo</h1>
          <SummaryPrice />
          <Button className="mt-5 w-full rounded-full" asChild>
            <Link href="/cart/identification">Continuar</Link>
          </Button>
        </div>
      </div>
      <ProductList title="Você também pode gostar" products={likelyProducts} />
      <Footer />
    </div>
  );
};

export default Review;
