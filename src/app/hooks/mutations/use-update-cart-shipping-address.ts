import { useMutation, useQueryClient } from "@tanstack/react-query";

import updateCartShippingAddress from "@/actions/update-cart-shipping-address";
import { UpdateCartShippingAddressSchema } from "@/actions/update-cart-shipping-address/schema";

import { getUserCartQuerieKey } from "../queries/use-cart";

export const getUpdateCartShippingAddressMutationKey = () => [
  "update-shipping-address",
];

export function useUpdateCartShippingAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserCartQuerieKey() });
    },
  });
}
