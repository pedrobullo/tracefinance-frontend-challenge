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
    type: "Tipo",
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
  filterMenu: {
    date: "Data",
    method: "Método",
    viewTransactionsOf: "Ver transações de",
    selectPeriod: "Selecione um período",
    of: "De",
    to: "Até",
    apply: "Aplicar",
    transactionType: "Tipo de transação",
  },
  periods: {
    thisMonth: "Este mês",
    lastMonth: "Mês passado",
    last3Months: "Últimos 3 meses",
    last6Months: "Últimos 6 meses",
    thisYear: "Este ano",
    custom: "Personalizado",
  },
  tabs: {
    all: "Todas",
    pending: "Pendentes",
    completed: "Concluídas",
    failed: "Falhadas",
  },
  emptyState: {
    noTransactions: "Nenhuma transação encontrada",
    noTransactionsDescription:
      "Não há transações para exibir com os filtros atuais.",
  },
};

export type TranslationKeys = typeof ptBR;
