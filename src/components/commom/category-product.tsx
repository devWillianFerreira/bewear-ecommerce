import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategoryProductProps {
  categories: (typeof categoryTable.$inferInsert)[];
}

const CategoryProduct = ({ categories }: CategoryProductProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-3xl bg-[#F4EFFF] p-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className="bg-white font-semibold"
        >
          <Link href={`/category/${category.slug}`}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default CategoryProduct;
