import Image from "next/image";

import { formatCentsToBRL } from "@/app/helpers/money";
import { Separator } from "@/components/ui/separator";

interface YourOrdersProps {
  totalPriceInCents: number;
  subTotalPriceInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const YourOrders = ({
  totalPriceInCents,
  subTotalPriceInCents,
  products,
}: YourOrdersProps) => {
  return (
    <div className="mt-5 space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-medium">Subtotal</p>
        <p className="text-muted-foreground">
          {formatCentsToBRL(subTotalPriceInCents)}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-medium">Entrega</p>
        <p className="text-muted-foreground">GRÁTIS</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-medium">Total</p>
        <p className="font-semibold">{formatCentsToBRL(totalPriceInCents)}</p>
      </div>

      <Separator />
      {products.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={item.imageUrl}
              width={96}
              height={96}
              alt={item.name}
              className="rounded-lg"
            />

            <div className="flex-col">
              <p className="font-bold">{item.name}</p>
              <p className="text-muted-foreground">{item.variantName}</p>
            </div>
          </div>
          <p className="font-bold">{formatCentsToBRL(item.priceInCents)}</p>
        </div>
      ))}
    </div>
  );
};

export default YourOrders;
