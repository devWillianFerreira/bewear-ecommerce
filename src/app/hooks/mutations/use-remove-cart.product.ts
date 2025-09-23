import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProductFromCart } from "@/actions/remove-cart-products";

import { getUserCartQuerieKey } from "../queries/use-cart";

export const getRemoveProductFromCartKey = (cartItemId: string) =>
  ["remove-product-from-cart-key", cartItemId] as const;

export function useRemoveProductFromCart(cartItemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getRemoveProductFromCartKey(cartItemId),
    mutationFn: () => removeProductFromCart({ cartItemId: cartItemId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getUserCartQuerieKey() }),
  });
}
