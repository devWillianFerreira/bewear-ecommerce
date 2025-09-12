"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-products";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        variantId: productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer rounded-full lg:flex-1"
      size="lg"
      onClick={() => mutate()}
    >
      {isPending && <LoaderCircle className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
