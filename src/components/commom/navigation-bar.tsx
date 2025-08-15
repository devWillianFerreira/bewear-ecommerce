import Link from "next/link";

const links = [
  { id: 1, name: " Camisetas", href: "/" },
  { id: 2, name: "Bermuda & Shorts", href: "/" },
  { id: 3, name: " Calças", href: "/" },
  { id: 4, name: "  Jaqueta & Moletons", href: "/" },
  { id: 5, name: " Tênis", href: "/" },
  { id: 6, name: " Camisetas", href: "/" },
];

const NavigationBar = () => {
  return (
    <div className="hidden w-full justify-between py-10 md:flex md:px-20 lg:px-30">
      {links.map((link) => (
        <Link href={link.name} className="font-light" key={link.id}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
