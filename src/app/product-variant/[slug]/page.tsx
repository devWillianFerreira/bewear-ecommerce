import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { formatCentsToBRL } from "@/app/helpers/money";
import Footer from "@/components/commom/footer";
import ProductList from "@/components/commom/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

import ProductActions from "../components/product-actions";
import VariantSelector from "../components/variant-selector";

interface ProductVariantProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  if (!productVariant.product?.categoryId) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: {
        orderBy: (variants, { asc }) => [asc(variants.id)],
      },
    },
  });

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 space-y-6 px-5 lg:grid-cols-2">
          <div className="flex flex-row justify-start gap-4">
            <div className="hidden lg:block">
              <Image
                src={productVariant.imageUrl}
                height={60}
                width={60}
                alt={productVariant.name}
                className="border-primary rounded-lg border-2"
              />
            </div>
            <Image
              src={productVariant.imageUrl}
              height={0}
              width={0}
              sizes="100vw"
              alt={productVariant.name}
              className="h-auto w-full rounded-lg lg:max-w-[700px]"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <div className="order-1 lg:order-2">
              <VariantSelector
                variants={productVariant.product.variants}
                selectedVariantSlug={productVariant.slug}
              />
            </div>
            <div className="order-2 lg:order-1">
              <h1 className="text-lg font-bold lg:text-3xl">
                {productVariant.product?.name}
              </h1>
              <h2>{productVariant.name}</h2>
              <h1 className="py-2 text-lg font-semibold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h1>
            </div>
            <div className="order-3">
              <ProductActions productVariantId={productVariant.id} />
            </div>
            <div className="order-4">
              <p className="text-shadow-amber-600">
                {productVariant.product?.description}
              </p>
            </div>
          </div>
        </div>
        <ProductList
          title="Você também pode gostar"
          products={likelyProducts}
        />
        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
