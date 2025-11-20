"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const SuccessPage = () => {
  return (
    <div>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            width={250}
            height={250}
            alt="Pedido Efetuado com sucesso!"
            className="mx-auto"
          />
          <DialogTitle className="text-2xl">Pedido Efetuado!</DialogTitle>
          <DialogDescription>
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter className="flex flex-col gap-4 md:flex-row">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer rounded-full p-2"
              size="lg"
            >
              <Link href="/">Página Inical</Link>
            </Button>
            <Button
              className="flex-1 cursor-pointer rounded-full p-2"
              size="lg"
            >
              Ver meus pedidos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessPage;
