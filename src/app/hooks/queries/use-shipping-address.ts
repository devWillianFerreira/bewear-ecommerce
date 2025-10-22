import { useQuery } from "@tanstack/react-query";

import getAddress from "@/actions/get-address";

export const getUserAdressQuerieKey = () => ["user-addresses"] as const;

export function useUserAddresses(params?: {
  initialData?: Awaited<ReturnType<typeof getAddress>>;
}) {
  return useQuery({
    queryKey: getUserAdressQuerieKey(),
    queryFn: getAddress,
    initialData: params?.initialData,
  });
}
