import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import { transactionService } from "@/services";
import { transactionKeys } from "@/constants";
import type {
  TransactionFilters,
  Transaction,
  CreateTransactionPayload,
} from "@repo/types/transaction";
import { TransactionType } from "@repo/types/schemas";

interface UseTransactionsOptions {
  filters: TransactionFilters;
  clientTypeFilter?: TransactionType;
}

export function useTransactions({
  filters,
  clientTypeFilter,
}: UseTransactionsOptions) {
  const query = useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => transactionService.list(filters),
    placeholderData: keepPreviousData,
  });

  const allTransactions = query.data?.data ?? [];

  const transactions: Transaction[] = clientTypeFilter
    ? allTransactions.filter((t) => t.type === clientTypeFilter)
    : allTransactions;

  const meta = query.data?.meta ?? {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    previousCursor: null,
    nextCursor: null,
  };

  return {
    ...query,
    transactions,
    meta,
    total: meta.total,
    totalPages: meta.totalPages,
    currentPage: meta.page,
    hasNextPage: meta.nextCursor !== null,
    hasPreviousPage: meta.previousCursor !== null,
    isEmpty: !query.isLoading && transactions.length === 0,
  };
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) =>
      transactionService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
