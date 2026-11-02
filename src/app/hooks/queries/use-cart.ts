import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export const getUserCartQuerieKey = () => ["cart"] as const;

export const useCart = (params?: {
  initialData?: Awaited<ReturnType<typeof getCart>>;
}) => {
  return useQuery({
    queryKey: getUserCartQuerieKey(),
    queryFn: getCart,
    initialData: params?.initialData,
    select: (cart) => ({
      items: cart.items,
      totalPriceInCents: cart.totalPriceInCents,
    }),
  });
};
