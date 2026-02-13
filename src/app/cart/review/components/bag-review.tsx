"use client";

import { Clock } from "lucide-react";

import { useCart } from "@/app/hooks/queries/use-cart";
import { Separator } from "@/components/ui/separator";

import BagItemReview from "./bag-item-review";

const BagReview = () => {
  const { data: cart } = useCart();
  return (
    <div className="space-y-6 rounded-lg">
      {cart?.items && cart.items.length > 0 ? (
        <div>
          {cart?.items
            .slice()
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((item) => (
              <div key={item.id} className="pt-5">
                <BagItemReview
                  id={item.id}
                  description={item.productVariant.name}
                  productName={item.productVariant.product?.name}
                  productVariantId={item.productVariant.id}
                  productVariantName={item.productVariant.name}
                  productVariantImageUrl={item.productVariant.imageUrl}
                  productVariantPriceInCents={item.productVariant.priceInCents}
                  quantity={item.quantity}
                />
                <Separator />
              </div>
            ))}
          <h3 className="flex flex-row items-center gap-3 pt-5 text-[#BA861E]">
            <Clock size={20} /> Apenas algumas restantes. Compre logo.
          </h3>
        </div>
      ) : (
        <div>
          <h1 className="text-center font-semibold">
            Não há produtos no carrinho
          </h1>
        </div>
      )}
    </div>
  );
};

export default BagReview;
