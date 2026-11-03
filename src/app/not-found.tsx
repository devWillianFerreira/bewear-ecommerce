import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <span className="text-8xl font-extrabold tracking-tight md:text-9xl">
        404
      </span>

      <h1 className="mt-4 text-xl font-bold md:text-2xl">
        Página não encontrada
      </h1>

      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        A página que você está procurando não existe ou foi removida.
      </p>

      <Button asChild className="mt-8">
        <Link href="/">Voltar para a página inicial</Link>
      </Button>
    </main>
  );
};

export default NotFound;
