import Image from "next/image";

import CategoryProduct from "@/components/commom/category-product";
import Header from "@/components/commom/header";
import ProductList from "@/components/commom/product-list";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const category = await db.query.categoryTable.findMany({});
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div>
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategoryProduct category={category} />
        </div>

        <div>
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}
