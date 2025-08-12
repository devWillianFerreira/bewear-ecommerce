import Image from "next/image";

import { Button } from "../ui/button";

const brands = [
  { id: 1, imageUrl: "/vector.svg", alt: "Nike" },
  { id: 2, imageUrl: "/vector-1.svg", alt: "Adidas" },
  { id: 3, imageUrl: "/vector-2.svg", alt: "Puma" },
  { id: 4, imageUrl: "/vector-3.svg", alt: "New Balance" },
  { id: 5, imageUrl: "/vector-4.svg", alt: "Converse" },
  { id: 6, imageUrl: "/vector-5.svg", alt: "Polo" },
  { id: 7, imageUrl: "/vector-6.svg", alt: "Polo" },
];

const PartnerBrands = () => {
  return (
    <div className="= space-y-6 px-5">
      <h3 className="font-semibold">Marcas Parceiras</h3>
      <div className="flex w-full gap-4 overflow-x-auto md:justify-between [&::-webkit-scrollbar]:hidden">
        {brands.map((brands) => (
          <div
            key={brands.id}
            className="flex flex-col items-center gap-2 md:flex-1"
          >
            <Button variant="ghost" className="h-15 w-30 border md:w-full">
              <Image
                src={brands.imageUrl}
                alt={brands.alt}
                width={50}
                height={50}
              />
            </Button>
            <p className="font-medium">{brands.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerBrands;
