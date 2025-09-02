import Image from "next/image";
import Link from "next/link";

import { formatCentsToBRL } from "@/app/helpers/money";
import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <div className="flex flex-col space-y-6">
      <Link
        href={`/product-variant/${firstVariant.slug}`}
        className="flex flex-col gap-4"
      >
        <div className="relative aspect-square w-[200px] shrink-0 md:w-full">
          <Image
            src={firstVariant.imageUrl}
            alt={firstVariant.name}
            fill
            className="rounded-3xl object-cover"
          />
        </div>
        <div
          className={cn(
            "flex max-w-[200px] flex-col gap-1",
            textContainerClassName,
          )}
        >
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-muted-foreground truncate text-xs font-medium">
            {product.description}
          </p>
          <p className="truncate text-sm font-semibold">
            {formatCentsToBRL(firstVariant.priceInCents)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
