import Image from "next/image";

import { formatCentsToBRL } from "@/app/helpers/money";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";

interface OrderProps {
  orders: Array<{
    id: string;
    status: (typeof orderTable.$inferSelect)["status"];
    totalPriceInCents: number;
    createdAt: Date;
    items: Array<{
      id: string;
      productName: string | undefined;
      productVariantName: string;
      priceInCents: number;
      imageUr: string;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrderProps) => {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="grid w-full grid-cols-5 items-center justify-between">
                    <div className="flex flex-col">
                      <p className="font-semibold">Data do Pedido</p>
                      <p className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="hidden flex-col items-center lg:flex">
                      <p className="font-semibold">Status</p>
                      {order.status == "paid" && <Badge>Pago</Badge>}
                      {order.status == "canceled" && <Badge>Cancelado</Badge>}
                      {order.status == "pending" && (
                        <Badge variant="outline">Pagamento Pendente</Badge>
                      )}
                    </div>
                    <div className="hidden flex-col items-center lg:flex">
                      <p className="font-semibold">Horário</p>
                      <p className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="hidden flex-col items-center lg:flex">
                      <p className="font-semibold">Pagamento</p>
                      <p className="text-muted-foreground">Cartão</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-5">
                  <Separator />
                  {order.items.map((item) => (
                    <div
                      className="flex w-full items-center gap-3"
                      key={item.id}
                    >
                      <Image
                        src={item.imageUr}
                        width={80}
                        height={80}
                        alt={item.productVariantName}
                        className="rounded-md"
                      />
                      <div className="flex w-full flex-col gap-1 lg:flex-row lg:justify-between">
                        <div className="flex flex-col">
                          <p className="font-semibold">{item.productName}</p>
                          <p>
                            {item.productVariantName} x {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {formatCentsToBRL(item.priceInCents)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Subtotal</p>
                    <p className="text-muted-foreground text-sm font-medium">
                      {formatCentsToBRL(order.totalPriceInCents)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Frete</p>
                    <p className="text-sm font-medium text-green-700">GRÁTIS</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Total</p>
                    <p className="text-sm font-medium">
                      {formatCentsToBRL(order.totalPriceInCents)}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
