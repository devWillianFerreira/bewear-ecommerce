import { db } from "@/db";
import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategoryProductProps {
  category: (typeof categoryTable.$inferInsert)[];
}

const CategoryProduct = ({ category }: CategoryProductProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-3xl bg-[#F4EFFF] p-6">
      {category.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className="bg-white font-semibold"
        >
          {category.name}{" "}
        </Button>
      ))}
    </div>
  );
};

export default CategoryProduct;
