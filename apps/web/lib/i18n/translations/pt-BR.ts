export const ptBR = {
  theme: {
    light: "Claro",
    dark: "Escuro",
    label: "Tema",
  },
  language: {
    "pt-BR": "Português",
    "en-US": "English",
    label: "Idioma",
  },
  pages: {
    transactions: "Transações",
    banking: "Banking",
  },
  filters: {
    status: "Status",
    currency: "Moeda",
    search: "Busca por ID",
    noFilterApplied: "Nenhum filtro aplicado",
  },
  status: {
    COMPLETED: "Concluído",
    PENDING: "Pendente de aprovação",
    FAILED: "Falhou",
  },
  transactionType: {
    PIX: "PIX",
    TED: "TED",
  },
  pixKeyType: {
    EMAIL: "Email",
    PHONE: "Telefone",
    CPF: "CPF",
    CNPJ: "CNPJ",
    RANDOM: "Aleatória",
  },
  accountType: {
    CORRENTE: "Corrente",
    POUPANCA: "Poupança",
  },
  table: {
    headers: {
      id: "ID",
      description: "Descrição",
      method: "Método",
      date: "Data",
      status: "Status",
      amount: "Valor",
    },
  },
};

export type TranslationKeys = typeof ptBR;
