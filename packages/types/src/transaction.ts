import type { TransactionStatus, TransactionType, PixKeyType, AccountType, Currency } from './constants'

export interface Transaction {
  id: string
  description?: string
  type: TransactionType
  amount: number
  currency: Currency
  status: TransactionStatus
  createdAt: string
  cpfCnpj: string
  pixKey?: string
  keyType?: PixKeyType
  bank?: string
  account?: string
  agency?: string
  accountType?: AccountType
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  previousCursor: number | null
  nextCursor: number | null
}

export interface TransactionsResponse {
  data: Transaction[]
  meta: PaginationMeta
}

export interface TransactionFilters {
  page?: number
  limit?: number
  search?: string
  status?: TransactionStatus
  currency?: Currency
  startDate?: string
  endDate?: string
  type?: TransactionType
}

export interface CreatePixTransactionPayload {
  type: 'PIX'
  amount: number
  cpfCnpj: string
  pixKey: string
  keyType: PixKeyType
  description?: string
}

export interface CreateTedTransactionPayload {
  type: 'TED'
  amount: number
  cpfCnpj: string
  bank: string
  account: string
  agency: string
  accountType: AccountType
  description?: string
}

export type CreateTransactionPayload = CreatePixTransactionPayload | CreateTedTransactionPayload

export interface ApiError {
  status: number
  message: string
  errors?: Array<{
    field: string
    message: string
  }>
}
