"use client";

import { Avatar } from "@radix-ui/react-avatar";
import {
  Home,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Search,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { formatCentsToBRL } from "@/app/helpers/money";
import { categoryTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";
interface HeaderProps {
  categories: Array<typeof categoryTable.$inferSelect>;
}

interface productProps {
  id: string;
  productName: string;
  productVariantName: string;
  imageUrl: string;
  slug: string;
  priceInCents: number;
}

const Header = ({ categories }: HeaderProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<productProps[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/search?search=${query}`);
      const data = await res.json();
      setProducts(data);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams();
    const searchString = event.currentTarget.value;
    setQuery(searchString);

    if (searchString) {
      params.set("search", searchString);
    } else {
      params.delete("search");
    }
    replace(`${pathName}?${params.toString()}`);
  }

  const { data: session } = authClient.useSession();
  return (
    <header>
      <div className="flex flex-col">
        <div className="grid grid-cols-[auto_auto] justify-between p-5 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden md:block">
            {!session?.user ? (
              <div className="flex items-center gap-4">
                <h2>Olá. Faça o seu login!</h2>
                <Button variant="outline" asChild size="icon">
                  <Link href="/authentication">
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <User />
                      <h3 className="font-semibold">
                        Olá, {session?.user?.name.split(" ")[0]}
                      </h3>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/">
                        <HomeIcon />
                        Início
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-orders">
                        <Truck size={16} />
                        Meus Pedidos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => authClient.signOut()}
                      variant="destructive"
                    >
                      <LogOutIcon />
                      Sair da conta
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="justify-self-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="BEWEAR"
                width={100}
                height={26.14}
                style={{ height: "auto" }}
              />
            </Link>
          </div>

          <div className="flex items-center gap-4 justify-self-end">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Search />
                </Button>
              </DialogTrigger>
              <DialogContent className="flex h-[30vh] flex-col sm:mx-auto md:max-w-2xl lg:max-w-4xl">
                <DialogHeader>
                  <DialogTitle>O que você está procurando?</DialogTitle>
                </DialogHeader>

                <div className="mt-2">
                  <Input type="search" onChange={handleChange} />
                </div>

                {!products.length ? (
                  <div className="text-muted-foreground flex flex-col gap-3">
                    <h1>Termos mais buscados</h1>
                    <div className="flex gap-2">
                      <Badge variant="outline">Tênis Nike </Badge>
                      <Badge variant="outline">Camiseta</Badge>
                      <Badge variant="outline">Jaqueta </Badge>
                    </div>
                  </div>
                ) : (
                  <ScrollArea className="mt-4 h-full min-h-0 flex-1">
                    <div className="flex flex-col gap-3">
                      {products.map((product) => (
                        <div key={product.id}>
                          <Link
                            href={`product-variant/${product.slug}`}
                            onClick={() => {
                              setOpenDialog(false);
                              const params = new URLSearchParams(
                                searchParams.toString(),
                              );
                              params.delete("search");

                              replace(`${pathName}?${params.toString()}`);
                            }}
                          >
                            <div className="flex flex-row items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={product.imageUrl}
                                  width={80}
                                  height={80}
                                  alt={product.productName}
                                  className="rounded-md"
                                />
                                <div>
                                  <p className="font-semibold">
                                    {product.productName}{" "}
                                  </p>
                                  <p className="text-muted-foreground">
                                    {product.productVariantName}
                                  </p>
                                </div>
                              </div>
                              <p className="text-muted-foreground">
                                {formatCentsToBRL(product.priceInCents)}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </DialogContent>
            </Dialog>

            <Cart />

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MenuIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-5 px-4">
                    {session?.user ? (
                      <>
                        <div className="flex justify-between space-y-6">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={session?.user?.image as string | undefined}
                              />
                              <AvatarFallback>
                                {session?.user?.name?.split(" ")?.[0]?.[0]}
                                {session?.user?.name?.split(" ")?.[1]?.[0]}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <h3 className="font-semibold">
                                {session?.user?.name}
                              </h3>
                              <span className="text-muted-foreground block text-xs">
                                {session?.user?.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <h2 className="font-semibold">
                            Olá. Faça o seu login!
                          </h2>
                          <Button variant="default" asChild>
                            <Link href="/authentication">
                              Login
                              <LogInIcon />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-3">
                      <Link
                        href="/"
                        className="flex flex-row items-center gap-3 font-semibold"
                      >
                        <Home size={16} />
                        <h2>Início</h2>
                      </Link>
                      <Link
                        href="/my-orders"
                        className="flex flex-row items-center gap-3 font-semibold"
                      >
                        <Truck size={16} />
                        <h2>Meus Pedidos</h2>
                      </Link>
                      <Link
                        href="/cart/review"
                        className="flex flex-row items-center gap-3 font-semibold"
                      >
                        <ShoppingBag size={16} />
                        <h2>Sacola</h2>
                      </Link>
                    </div>

                    <Separator />
                    <div className="flex flex-col space-y-3">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                        >
                          <span className="font-semibold">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                    <Separator />
                    {session?.user && (
                      <button
                        onClick={() => authClient.signOut()}
                        className="text-muted-foreground flex w-full items-center justify-start gap-3 font-semibold"
                      >
                        <LogOutIcon size={16} />
                        <span>Sair da conta</span>
                      </button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
