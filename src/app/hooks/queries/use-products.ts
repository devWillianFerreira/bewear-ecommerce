import { useQuery } from "@tanstack/react-query";

import { getSearchProducts } from "@/actions/get-searchProduct";

export const getSearchProductsQueryKey = (search: string) =>
  ["search", search] as const;

export const useSearchProducts = (search: string) => {
  return useQuery({
    queryKey: getSearchProductsQueryKey(search),
    queryFn: () =>
      getSearchProducts({
        search,
      }),
    enabled: true,
  });
};
