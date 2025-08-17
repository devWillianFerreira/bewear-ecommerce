import { desc } from "drizzle-orm";
import Image, { getImageProps } from "next/image";

import CategoryProduct from "@/components/commom/category-product";
import Footer from "@/components/commom/footer";
import Header from "@/components/commom/header";
import NavigationBar from "@/components/commom/navigation-bar";
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

  const categories = await db.query.categoryTable.findMany({});

  const common = { alt: "Leve uma vida com estilo", sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 0,
    height: 0,
    quality: 80,
    src: "/banner-01-desktop.png",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 0,
    height: 0,
    quality: 70,
    src: "/banner-01.png",
  });
  return (
    <>
      <Header />
      <NavigationBar />
      <div className="space-y-6">
        <div className="px-5">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={desktop}
              sizes="100vw"
              className="h-auto w-full"
            />
            <source
              media="(min-width: 500px)"
              srcSet={mobile}
              sizes="100vw"
              className="h-auto w-full"
            />
            <img
              {...rest}
              style={{ width: "100%", height: "auto" }}
              alt={rest.alt}
            />
          </picture>
        </div>
        <PartnerBrands />

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5 md:hidden">
          <CategoryProduct categories={categories} />
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
