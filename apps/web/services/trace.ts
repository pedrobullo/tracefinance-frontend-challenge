import type {
  Transaction,
  TransactionsResponse,
  TransactionFilters,
  CreateTransactionPayload,
} from "@repo/types/transaction";

import { apiCall } from "./api";

const TRACE_BASE_URL =
  process.env.TRACE_API_URL ||
  "https://fe-challenge-trace-api-production.up.railway.app/api";

export const traceService = {
  transactions: {
    list: (filters: TransactionFilters = {}): Promise<TransactionsResponse> =>
      apiCall<TransactionsResponse>({
        endpoint: `${TRACE_BASE_URL}/transactions`,
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
        showErrorToast: false,
      }),

    create: (payload: CreateTransactionPayload): Promise<Transaction> =>
      apiCall<Transaction>({
        endpoint: `${TRACE_BASE_URL}/transactions`,
        method: "POST",
        body: payload,
        showErrorToast: false,
      }),
  },
};
