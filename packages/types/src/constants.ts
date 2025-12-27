export const TRANSACTION_STATUS = {
  COMPLETED: "COMPLETED",
  PENDING: "PENDING",
  FAILED: "FAILED",
} as const;

export type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export const TRANSACTION_TYPE = {
  PIX: "PIX",
  TED: "TED",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export const CURRENCY = {
  BRL: "BRL",
  USD: "USD",
  EUR: "EUR",
} as const;

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];

export const PIX_KEY_TYPE = {
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  CPF: "CPF",
  CNPJ: "CNPJ",
  RANDOM: "RANDOM",
} as const;

export type PixKeyType = (typeof PIX_KEY_TYPE)[keyof typeof PIX_KEY_TYPE];

export const ACCOUNT_TYPE = {
  CORRENTE: "CORRENTE",
  POUPANCA: "POUPANCA",
} as const;

export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const BANKS = [
  { code: "001", name: "Banco do Brasil" },
  { code: "033", name: "Santander" },
  { code: "104", name: "Caixa Econômica" },
  { code: "237", name: "Bradesco" },
  { code: "341", name: "Itaú" },
  { code: "356", name: "Banco Real" },
  { code: "389", name: "Mercantil do Brasil" },
  { code: "399", name: "HSBC" },
  { code: "422", name: "Safra" },
  { code: "453", name: "Rural" },
  { code: "633", name: "Rendimento" },
  { code: "652", name: "Itaú Unibanco" },
  { code: "745", name: "Citibank" },
  { code: "756", name: "Sicoob" },
] as const;
