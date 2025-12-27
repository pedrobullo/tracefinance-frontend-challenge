import type {
  Transaction,
  TransactionsResponse,
  TransactionFilters,
  CreateTransactionPayload,
} from "@repo/types/transaction";

import { apiCall } from "./api";

export const transactionService = {
  list: (filters: TransactionFilters = {}): Promise<TransactionsResponse> =>
    apiCall<TransactionsResponse>({
      endpoint: "/api/transactions",
      params: {
        page: filters.page,
        limit: filters.limit,
        search: filters.search,
        status: filters.status,
        currency: filters.currency,
        startDate: filters.startDate,
        endDate: filters.endDate,
        type: filters.type,
      },
    }),

  create: (payload: CreateTransactionPayload): Promise<Transaction> =>
    apiCall<Transaction>({
      endpoint: "/api/transactions",
      method: "POST",
      body: payload,
    }),
};
