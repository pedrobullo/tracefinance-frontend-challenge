import type { TranslationKeys } from "./pt-BR";

export const enUS: TranslationKeys = {
  theme: {
    light: "Light",
    dark: "Dark",
    label: "Theme",
  },
  language: {
    "pt-BR": "Português",
    "en-US": "English",
    label: "Language",
  },
  pages: {
    transactions: "Transactions",
    banking: "Banking",
  },
  filters: {
    status: "Status",
    currency: "Currency",
    search: "Search by ID",
    type: "Type",
    noFilterApplied: "No filter applied",
  },
  status: {
    COMPLETED: "Completed",
    PENDING: "Pending approval",
    FAILED: "Failed",
  },
  transactionType: {
    PIX: "PIX",
    TED: "TED",
  },
  pixKeyType: {
    EMAIL: "Email",
    PHONE: "Phone",
    CPF: "CPF",
    CNPJ: "CNPJ",
    RANDOM: "Random",
  },
  accountType: {
    CORRENTE: "Checking",
    POUPANCA: "Savings",
  },
  table: {
    headers: {
      id: "ID",
      description: "Description",
      method: "Method",
      date: "Date",
      status: "Status",
      amount: "Amount",
    },
  },
  filterMenu: {
    date: "Date",
    method: "Method",
    viewTransactionsOf: "View transactions of",
    selectPeriod: "Select a period",
    of: "From",
    to: "To",
    apply: "Apply",
    transactionType: "Transaction type",
  },
  periods: {
    thisMonth: "This month",
    lastMonth: "Last month",
    last3Months: "Last 3 months",
    last6Months: "Last 6 months",
    thisYear: "This year",
    custom: "Custom",
  },
  tabs: {
    all: "All",
    pending: "Pending",
    completed: "Completed",
    failed: "Failed",
  },
  emptyState: {
    noTransactions: "No transactions found",
    noTransactionsDescription:
      "There are no transactions to display with the current filters.",
  },
};
