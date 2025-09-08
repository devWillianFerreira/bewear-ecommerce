import Link from "next/link";

import { db } from "@/db";

const NavigationBar = async () => {
  const category = await db.query.categoryTable.findMany({});
  return (
    <div className="mb-6 hidden w-full justify-between space-y-6 border-b-1 md:flex md:px-20 lg:px-30">
      {category.map((category) => (
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
