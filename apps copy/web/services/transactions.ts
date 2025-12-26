import { api } from "./api";
import type {
  Transaction,
  TransactionsResponse,
  TransactionFilters,
  CreateTransactionPayload,
} from "@repo/types/transaction";

/**
 * Serviço de transações
 * Encapsula todas as chamadas relacionadas a transações
 */
export const transactionService = {
  /**
   * Lista transações com filtros e paginação
   */
  list: (filters: TransactionFilters = {}): Promise<TransactionsResponse> => {
    return api.get<TransactionsResponse>("/transactions", {
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      status: filters.status,
      currency: filters.currency,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
  },

  /**
   * Cria uma nova transação (PIX ou TED)
   */
  create: (payload: CreateTransactionPayload): Promise<Transaction> => {
    return api.post<Transaction>("/transactions", payload);
  },
};
