import { useMutation, useQueryClient } from "@tanstack/react-query";

import FinishOrder from "@/actions/finish-order";

import { getUserCartQuerieKey } from "../queries/use-cart";

const getFinishOrderMutationKey = () => ["finish-order"] as const;

export function useFinishOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getFinishOrderMutationKey(),
    mutationFn: async () => {
      await FinishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserCartQuerieKey() });
    },
  });
}
