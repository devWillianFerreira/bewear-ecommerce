"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  function handleDecrement() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  }
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium">Quantidade</h3>
          <div className="mt-2 flex w-40 items-center justify-between rounded-lg border">
            <Button
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              onClick={handleDecrement}
            >
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              onClick={handleIncrement}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className="order-4 flex w-full flex-col gap-4 lg:flex-row">
          <AddToCartButton
            productVariantId={productVariantId}
            quantity={quantity}
          />
          <Button
            className="w-full cursor-pointer rounded-full lg:flex-1"
            size="lg"
          >
            Comprar Agora
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
