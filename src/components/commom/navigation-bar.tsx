import Link from "next/link";

import { db } from "@/db";

const NavigationBar = async () => {
  const category = await db.query.categoryTable.findMany({});
  return (
    <div className="hidden w-full justify-between py-10 md:flex md:px-20 lg:px-30">
      {category.map((category) => (
        <Link
          href={`/category/${category.slug}`}
          className="font-light"
          key={category.id}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
