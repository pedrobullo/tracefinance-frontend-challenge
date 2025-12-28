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
    applied: "Filters applied successfully",
    removed: "Filter removed",
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
  transactionForm: {
    steps: {
      method: "Method",
      information: "Information",
    },
    methodTitle: "Transaction method",
    informationTitle: "Information",
    transactionInfo: "Transaction information",
    amount: "Amount",
    taxId: "Tax ID",
    legalName: "Legal name",
    pixDetails: "PIX details",
    keyType: "Key type",
    pixKey: "PIX key",
    bankDetails: "Bank details",
    accountType: "Account type",
    bank: "Bank code",
    account: "Account number with digit",
    agency: "Branch",
    descriptionSection: "Add a description for this transaction (optional)",
    descriptionHelper:
      "This message will be displayed to the recipient of this transaction.",
    descriptionPlaceholder: "Description",
    cancel: "Cancel",
    next: "Next",
    back: "Back",
    send: "Send",
    sending: "Sending...",
    newTransaction: "New Transaction",
    created: "Transaction created successfully",
  },
  errors: {
    amount: {
      required: "Amount is required",
      positive: "Amount must be positive",
    },
    cpfCnpj: {
      required: "Tax ID is required",
      min: "Tax ID must be at least 11 characters",
      max: "Tax ID must be at most 14 characters",
    },
    legalName: {
      required: "Legal name is required",
    },
    pixKey: {
      required: "PIX key is required",
    },
    bank: {
      required: "Bank is required",
      min: "Bank code must be 3 digits",
    },
    account: {
      required: "Account is required",
    },
    agency: {
      required: "Branch is required",
    },
  },
};
