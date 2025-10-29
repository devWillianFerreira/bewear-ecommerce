import { QueryClient, useMutation } from "@tanstack/react-query";

import createShippingAddress from "@/actions/create-shipping-address";

import { getUserAddressesQueryKey } from "../queries/use-shipping-address";

export const getCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export function useCreateShippingAddress() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
}
