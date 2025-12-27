import type { TransactionFilters } from "@repo/types/transaction";

/**
 * Query keys centralizadas para consistência no cache
 */
export const transactionKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionKeys.all, "list"] as const,
  list: (filters: TransactionFilters) =>
    [...transactionKeys.lists(), filters] as const,
};
