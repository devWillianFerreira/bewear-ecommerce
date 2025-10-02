"use client";

import { productTable, productVariantTable } from "@/db/schema";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="px-5">
      <h3 className="font-semibold">{title}</h3>
      <Carousel className="flex w-full flex-col">
        <div className="z-10 mb-2 hidden justify-end gap-2 md:flex">
          <CarouselPrevious
            className="!static !top-auto !right-auto !left-auto !transform-none"
            aria-label="Anterior"
          />
          <CarouselNext
            className="!static !top-auto !right-auto !left-auto !transform-none"
            aria-label="Próximo"
          />
        </div>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[80%] pl-4 sm:basis-[50%] md:basis-[33.33%] lg:basis-[25%]"
            >
              <ProductItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductList;
