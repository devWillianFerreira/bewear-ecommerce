import { desc } from "drizzle-orm";
import Image from "next/image";

import CategoryProduct from "@/components/commom/category-product";
import Footer from "@/components/commom/footer";
import Header from "@/components/commom/header";
import PartnerBrands from "@/components/commom/partner-brands";
import ProductList from "@/components/commom/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.created)],
    with: {
      variants: true,
    },
  });

  const category = await db.query.categoryTable.findMany({});
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <PartnerBrands />

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategoryProduct category={category} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
}
