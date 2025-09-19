import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-products";
import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-products";
import { formatCentsToBRL } from "@/app/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName?: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantImageUrl,
  productVariantName,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const decreaseCartProduct = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const increaseCartProductQuantity = useMutation({
    mutationKey: ["increase-cart-product-quantity"],
    mutationFn: () => addProductToCart({ variantId: id, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  function handleDeleteClick() {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => toast.success("Produto removido com sucesso!"),
      onError: () =>
        toast.error("Erro ao remover o produto do carrinho, tente novamente!"),
    });
  }

  function handleDecreaseClick() {
    decreaseCartProduct.mutate(undefined, {
      onError: () =>
        toast.error("Erro ao diminuir quantidade do produto, tente novamente!"),
    });
  }

  return (
    <div className="flex items-center justify-between">
      <Image
        src={productVariantImageUrl}
        width={78}
        height={78}
        alt={productVariantName}
        className="rounded-md"
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{productName}</p>
        <p className="text-muted-foreground text-xs font-medium">
          {productVariantName}
        </p>
        <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
          <Button
            className="h-4 w-4"
            variant="ghost"
            onClick={handleDecreaseClick}
          >
            <MinusIcon />
          </Button>
          <p className="text-xs font-medium">{quantity}</p>
          <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
