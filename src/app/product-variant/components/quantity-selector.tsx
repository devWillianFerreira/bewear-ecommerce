"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  function handleDecrement() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  }
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-40 items-center justify-between rounded-lg border">
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
  );
};

export default QuantitySelector;
