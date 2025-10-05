"use client";

import { redirect } from "next/navigation";

import { formatCentsToBRL } from "@/app/helpers/money";
import { useCart } from "@/app/hooks/queries/use-cart";
import { Separator } from "@/components/ui/separator";

const SummaryPrice = () => {
  const { data: cart } = useCart();
  if (!cart) {
    redirect("/");
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs font-medium">
        <p>Subtotal</p>
        <p>{formatCentsToBRL(cart.totalPriceInCents)}</p>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-xs font-medium">
        <p>Entrega</p>
        <p className="text-green-700">GRÁTIS</p>
      </div>

      <Separator />

      <div className="flex items-center justify-between font-bold">
        <p>Total</p>

        <p>{formatCentsToBRL(cart.totalPriceInCents)}</p>
      </div>
    </div>
  );
};

export default SummaryPrice;
