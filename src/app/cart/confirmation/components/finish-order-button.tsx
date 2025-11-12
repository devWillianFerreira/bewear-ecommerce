"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useFinishOrder } from "@/app/hooks/mutations/use-finish-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const FinishOrderButton = () => {
  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false);
  const finishOrderMutation = useFinishOrder();
  function handleFinishOrder() {
    finishOrderMutation.mutate();
    setSuccessDialogIsOpen(true);
  }
  return (
    <>
      <Button
        className="w-full cursor-pointer rounded-full"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader className="h-4 w-4 animate-spin" />
        )}
        Finalizar Compra
      </Button>

      <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
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
    </>
  );
};

export default FinishOrderButton;
