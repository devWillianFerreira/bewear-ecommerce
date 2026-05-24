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

interface AlertDialogProps {
  image: string;
  title: string;
  description: string;
}
const FeedbackDialog = ({ image, title, description }: AlertDialogProps) => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="text-center">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Pedido Efetuado com sucesso!"
          className="mx-auto"
        />
        <DialogTitle className="text-2xl">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        <DialogFooter className="flex flex-col gap-4 md:flex-row">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer rounded-full p-2"
            size="lg"
            asChild
          >
            <Link href="/">Página Inical</Link>
          </Button>
          <Button className="flex-1 cursor-pointer rounded-full p-2" size="lg">
            <Link href="/my-orders">Ver meus pedidos</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
