export const formatCentsToBRL = (cents: number) => {
  return new Intl.NumberFormat("BRL", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
};
