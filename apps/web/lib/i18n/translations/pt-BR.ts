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
    applied: "Filtros aplicados com sucesso",
    removed: "Filtro removido",
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
  transactionForm: {
    steps: {
      method: "Método",
      information: "Informações",
    },
    methodTitle: "Método de transação",
    informationTitle: "Informações",
    transactionInfo: "Informações da transação",
    amount: "Valor",
    taxId: "CPF/CNPJ",
    legalName: "Nome completo",
    pixDetails: "Detalhes PIX",
    keyType: "Tipo de chave",
    pixKey: "Chave PIX",
    bankDetails: "Dados bancários",
    accountType: "Tipo de conta",
    bank: "Código do banco",
    account: "Número da conta com dígito",
    agency: "Agência",
    descriptionSection: "Adicione uma descrição para esta transação (opcional)",
    descriptionHelper:
      "Esta mensagem será exibida para o destinatário desta transação.",
    descriptionPlaceholder: "Descrição",
    cancel: "Cancelar",
    next: "Próximo",
    back: "Voltar",
    send: "Enviar",
    sending: "Enviando...",
    newTransaction: "Nova Transação",
    created: "Transação criada com sucesso",
  },
  errors: {
    amount: {
      required: "Valor é obrigatório",
      positive: "Valor deve ser positivo",
    },
    cpfCnpj: {
      required: "CPF/CNPJ é obrigatório",
      min: "CPF/CNPJ deve ter no mínimo 11 caracteres",
      max: "CPF/CNPJ deve ter no máximo 14 caracteres",
    },
    legalName: {
      required: "Nome completo é obrigatório",
    },
    pixKey: {
      required: "Chave PIX é obrigatória",
    },
    bank: {
      required: "Banco é obrigatório",
      min: "Código do banco deve ter 3 dígitos",
    },
    account: {
      required: "Conta é obrigatória",
    },
    agency: {
      required: "Agência é obrigatória",
    },
  },
};

export type TranslationKeys = typeof ptBR;
