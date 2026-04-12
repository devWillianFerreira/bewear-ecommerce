import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/app/helpers/money";
import { useDecreaseCartProduct } from "@/app/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartproduct } from "@/app/hooks/mutations/use-increase-cart-product";
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
  const decreaseCartProduct = useDecreaseCartProduct(id);

  const increaseCartProductQuantity = useIncreaseCartproduct(productVariantId);

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
    <div className="grid grid-cols-[auto_1fr_auto] justify-between gap-4">
      <Image
        src={productVariantImageUrl}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full max-w-[164px] rounded-lg"
        alt={productVariantName}
      />

      <div className="flex flex-col justify-center">
        <h1 className="line-clamp-2 min-w-[80px] font-semibold">
          {productName}
        </h1>
        <h2 className="text-muted-foreground min-w-[80px] truncate">
          {description}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full max-w-[100px] min-w-[80px] items-center justify-between rounded-lg border p-1">
          <Button
            className="flex h-6 w-6 cursor-pointer items-center justify-center p-0"
            variant="ghost"
            onClick={handleDecreaseClick}
          >
            {quantity > 1 ? (
              <MinusIcon className="h-4 w-4" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
          </Button>
          <p className="text-xs font-medium">{quantity}</p>
          <Button
            className="flex h-6 w-6 cursor-pointer items-center justify-center p-0"
            variant="ghost"
            onClick={handleincreaseClick}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="min-w-[80px] font-semibold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </h1>
      </div>
    </div>
  );
};

export default BagItemReview;
