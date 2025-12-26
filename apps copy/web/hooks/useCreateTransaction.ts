import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { transactionService } from "@/services";
import { transactionKeys } from "@/constants";
import type { CreateTransactionPayload } from "@repo/types/transaction";

/**
 * Hook para criar nova transação
 * Invalida o cache de listagem após sucesso
 */
export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) =>
      transactionService.create(payload),
    onSuccess: () => {
      // Invalida todas as queries de listagem para refetch
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      toast.success("Transação criada com sucesso!");
    },
    onError: () => {
      // Erro já é tratado no apiCall, mas podemos adicionar lógica extra aqui
    },
  });
}
