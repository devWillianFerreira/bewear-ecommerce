"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { LogInIcon, LogOutIcon, MenuIcon, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

const Header = () => {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = authClient.useSession();
  return (
    <header>
      <div className="flex flex-col">
        <div className="flex justify-between p-5">
          {!isMobile && (
            <div>
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
                  <User />
                  <h3 className="font-semibold">
                    Olá, {session?.user?.name.split(" ")[0]}
                  </h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => authClient.signOut()}
                  >
                    <LogOutIcon />
                  </Button>
                </div>
              )}
            </div>
          )}

          <Link href="/">
            <Image
              src="/logo.svg"
              alt="BEWEAR"
              width={100}
              height={26.14}
              style={{ height: "auto" }}
            />
          </Link>
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              asChild
            >
              <Link href="/">
                <Search />
              </Link>
            </Button>
            <Cart />

            {isMobile && (
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
                  <div className="px-5">
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
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => authClient.signOut()}
                          >
                            <LogOutIcon />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <h2>Olá. Faça o seu login!</h2>
                        <Button variant="outline" asChild size="icon">
                          <Link href="/authentication">
                            <LogInIcon />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
