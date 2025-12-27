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
};
