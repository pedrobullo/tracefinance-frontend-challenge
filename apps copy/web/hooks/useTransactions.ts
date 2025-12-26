import { useInfiniteQuery } from "@tanstack/react-query";
import { transactionService } from "@/services";
import { transactionKeys } from "@/constants";
import type {
  TransactionFilters,
  TransactionsResponse,
} from "@repo/types/transaction";

/**
 * Hook para listagem de transações com infinite scroll
 * Utiliza useInfiniteQuery para carregar mais páginas sob demanda
 */
export function useTransactions(
  filters: Omit<TransactionFilters, "page"> = {}
) {
  return useInfiniteQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: ({ pageParam = 1 }) =>
      transactionService.list({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TransactionsResponse) =>
      lastPage.meta.nextCursor,
    getPreviousPageParam: (firstPage: TransactionsResponse) =>
      firstPage.meta.previousCursor,
  });
}
