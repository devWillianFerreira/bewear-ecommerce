import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="cursor-pointer" asChild>
          <Link href="/">
            <ShoppingBagIcon />
          </Link>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
