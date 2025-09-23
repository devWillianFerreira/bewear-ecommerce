import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

import { getUserCartQuerieKey } from "../queries/use-cart";

export const getDecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decrease-cart-product-key", cartItemId] as const;

export function useDecreaseCartProduct(cartItemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId: cartItemId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getUserCartQuerieKey() }),
  });
}
