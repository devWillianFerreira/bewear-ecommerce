import Link from "next/link";

import { categoryTable } from "@/db/schema";
interface NavigationBarProps {
  categories: Array<typeof categoryTable.$inferSelect>;
}
const NavigationBar = async ({ categories }: NavigationBarProps) => {
  return (
    <div className="mb-6 hidden w-full justify-between space-y-6 border-b-1 md:flex md:px-20 lg:px-30">
      {categories.map((category) => (
        <Link
          href={`/category/${category.slug}`}
          className="font-medium text-[#656565] hover:text-[#474747]"
          key={category.id}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
