import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-products";

import { getUserCartQuerieKey } from "../queries/use-cart";

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["increase-cart-product-key", productVariantId] as const;

export function useIncreaseCartproduct(productVariantId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () =>
      addProductToCart({ variantId: productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserCartQuerieKey() });
    },
  });
}
