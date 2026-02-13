import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/app/helpers/money";
import { useDecreaseCartProduct } from "@/app/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartproduct } from "@/app/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/app/hooks/mutations/use-remove-cart.product";
import { Button } from "@/components/ui/button";

interface BagItemReviewProps {
  id: string;
  productVariantId: string;
  productName?: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
  description?: string;
}

const BagItemReview = ({
  id,
  productVariantId,
  productVariantImageUrl,
  productVariantName,
  productVariantPriceInCents,
  description,
  quantity,
  productName,
}: BagItemReviewProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);

  const decreaseCartProduct = useDecreaseCartProduct(id);

  const increaseCartProductQuantity = useIncreaseCartproduct(productVariantId);

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

  function handleincreaseClick() {
    increaseCartProductQuantity.mutate(undefined, {
      onError: () =>
        toast.error("Erro ao diminuir quantidade do produto, tente novamente!"),
    });
  }
  return (
    <div className="pt- flex flex-row items-center justify-between gap-5 pb-5">
      <div className="flex flex-row items-center gap-4">
        <Image
          src={productVariantImageUrl}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full max-w-[164px] rounded-lg"
          alt={productVariantName}
        />
        <div>
          <h1 className="font-semibold">{productName}</h1>
          <h2 className="text-muted-foreground truncate">{description}</h2>
        </div>
      </div>
      <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
        <Button
          className="h-4 w-4 cursor-pointer"
          variant="ghost"
          onClick={handleDecreaseClick}
        >
          <MinusIcon />
        </Button>
        <p className="text-xs font-medium">{quantity}</p>
        <Button
          className="h-4 w-4 cursor-pointer"
          variant="ghost"
          onClick={handleincreaseClick}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer"
          onClick={handleDeleteClick}
        >
          <Trash />
        </Button>
        <h1 className="font-semibold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </h1>
      </div>
    </div>
  );
};

export default BagItemReview;
