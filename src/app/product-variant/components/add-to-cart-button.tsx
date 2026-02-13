"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { boolean } from "zod";

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: ({ buyNow }: { buyNow?: boolean }) =>
      addProductToCart({
        variantId: productVariantId,
        quantity,
      }),
    onSuccess: (__data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado com sucesso!");
      if (variables.buyNow) {
        router.push("/cart/review");
      }
    },
    onError() {
      toast.error("Você precisa estar logado para adicionar ao carrinho.");
    },
  });
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <Button
        variant="outline"
        className="w-full flex-1 cursor-pointer rounded-full p-2"
        size="lg"
        onClick={() => {
          mutate({});
        }}
        disabled={isPending}
      >
        Adicionar à sacola
      </Button>
      <Button
        variant="default"
        className="w-full flex-1 cursor-pointer rounded-full p-2"
        size="lg"
        onClick={() => mutate({ buyNow: true })}
        disabled={isPending}
      >
        Comprar Agora
      </Button>
    </div>
  );
};

export default AddToCartButton;
