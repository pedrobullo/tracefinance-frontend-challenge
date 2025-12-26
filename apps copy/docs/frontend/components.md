# Componentes UI

## @repo/ui

Componentes genéricos e reutilizáveis. Vivem em `packages/ui/src/`.

### Disponíveis

| Componente | Props principais                          |
| ---------- | ----------------------------------------- |
| `Button`   | `variant`, `size`, `disabled`, `loading`  |
| `Input`    | `label`, `error`, `placeholder`           |
| `Select`   | `options`, `value`, `onChange`            |
| `Modal`    | `isOpen`, `onClose`, `title`              |
| `Badge`    | `variant` (success, warning, error, info) |
| `Skeleton` | `width`, `height`, `variant`              |
| `Table`    | `columns`, `data`                         |
| `Stepper`  | `steps`, `currentStep`                    |

### Uso

```tsx
import { Button, Input, Badge } from '@repo/ui'

<Button variant="primary" onClick={handleClick}>
  Confirmar
</Button>

<Input
  label="Email"
  error={errors.email?.message}
  {...register('email')}
/>

<Badge variant="success">Completed</Badge>
```

## web/components

Componentes específicos do app. Não fazem sentido em outros contextos.

### Estrutura

```
components/
├── transactions/
│   ├── TransactionList.tsx
│   ├── TransactionFilters.tsx
│   ├── TransactionForm/
│   │   ├── index.tsx
│   │   ├── StepBasicInfo.tsx
│   │   └── StepDetails.tsx
│   └── TransactionRow.tsx
│
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── MainLayout.tsx
│
└── shared/
    └── EmptyState.tsx
```

## Convenções

### Tamanho

Max **200-300 linhas** por componente. Se passar, quebre em partes menores.

### forwardRef

Só pra inputs que precisam de ref (integração com forms). Outros componentes são funções simples.

### Props

```tsx
// ✅ Bom - props explícitas
interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

// ❌ Ruim - any ou props genéricas demais
interface ButtonProps {
  [key: string]: any;
}
```

### Migrar pra @repo/ui?

Pergunte: "Outro app precisaria disso?"

- **Sim** → migra pra `@repo/ui`
- **Não** → fica em `web/components`
