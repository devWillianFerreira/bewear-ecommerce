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

const CancelPage = () => {
  return (
    <div>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/error.svg"
            width={150}
            height={150}
            alt="Pedido Efetuado com sucesso!"
            className="mx-auto"
          />
          <DialogTitle className="text-2xl text-yellow-600">
            Algo deu errado!
          </DialogTitle>
          <DialogDescription>
            Não foi possível concluir a operação. O pedido pode ter sido
            cancelado ou houve um erro inesperado. Tente novamente ou entre em
            contato com o suporte.
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

export default CancelPage;
