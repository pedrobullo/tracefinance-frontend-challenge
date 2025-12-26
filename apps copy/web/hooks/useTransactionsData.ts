import { useTransactions } from "./useTransactions";
import type { TransactionFilters } from "@repo/types/transaction";

/**
 * Hook auxiliar para obter dados agregados das transações
 * Útil para exibir contadores nas tabs
 */
export function useTransactionsData(
  filters: Omit<TransactionFilters, "page"> = {}
) {
  const query = useTransactions(filters);

  // Flatten das páginas para uma lista única
  const transactions = query.data?.pages.flatMap((page) => page.data) ?? [];

  // Total do primeiro fetch (sempre tem a meta atualizada)
  const total = query.data?.pages[0]?.meta.total ?? 0;

  return {
    ...query,
    transactions,
    total,
    isEmpty: !query.isLoading && transactions.length === 0,
  };
}
