# Estrutura de Pastas

## App Web

```
apps/web/
├── app/                    # Next.js App Router
│   ├── api/               # BFF routes
│   │   └── transactions/  # /api/transactions
│   ├── layout.tsx         # Layout raiz + providers
│   ├── page.tsx           # Página principal
│   └── globals.css        # Tailwind + tokens
│
├── components/            # Componentes do app
│   ├── transactions/      # Feature: transações
│   │   ├── TransactionList.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── TransactionForm/
│   ├── layout/            # Header, Sidebar...
│   └── shared/            # Componentes genéricos do app
│
├── hooks/                 # Custom hooks
│   ├── useTransactions.ts # React Query wrapper
│   └── useCreateTransaction.ts
│
├── services/              # Camada HTTP
│   ├── api.ts            # apiCall base
│   ├── transactions.ts   # transactionService
│   └── index.ts          # re-exports
│
├── contexts/              # React Contexts
│   ├── ThemeProvider.tsx
│   ├── LanguageProvider.tsx
│   └── Providers.tsx     # Agregador
│
├── lib/                   # Utilitários
│   ├── backend.ts        # BFF fetch
│   ├── constants.ts      # Constantes
│   └── i18n/             # Traduções
│
└── __tests__/            # Testes
```

## Package UI

```
packages/ui/src/
├── Button.tsx
├── Input.tsx
├── Select.tsx
├── Modal.tsx
├── Badge.tsx
├── Skeleton.tsx
├── Table/
│   ├── Table.tsx
│   ├── TableRow.tsx
│   └── index.ts
└── index.ts              # Barrel export
```

## Convenções

### Nomenclatura

- **Componentes**: PascalCase (`TransactionList.tsx`)
- **Hooks**: camelCase com `use` (`useTransactions.ts`)
- **Utils**: camelCase (`formatCurrency.ts`)

### Onde colocar cada coisa?

| Tipo            | Local            | Quando                       |
| --------------- | ---------------- | ---------------------------- |
| UI genérico     | `@repo/ui`       | Reutilizável em qualquer app |
| UI específico   | `web/components` | Só faz sentido nesse app     |
| Lógica de dados | `hooks/`         | Usa React Query ou estado    |
| HTTP            | `services/`      | Chamadas à API               |
| Tipos           | `@repo/types`    | Compartilhado entre apps     |

### Migrar pra @repo/ui?

Regra simples: se outro app precisar, migra. Senão, deixa em `web/components`.
