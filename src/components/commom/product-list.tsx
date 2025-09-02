"use client";

import { productTable, productVariantTable } from "@/db/schema";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6 px-5">
      <h3 className="font-semibold">{title}</h3>
      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              className="basis-[80%] pl-4 sm:basis-[50%] md:basis-[33.33%] lg:basis-[25%]"
              key={product.id}
            >
              <ProductItem key={product.id} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductList;
