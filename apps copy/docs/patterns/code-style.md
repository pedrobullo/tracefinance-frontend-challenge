# Code Style

## Princípios

### KISS (Keep It Simple, Stupid)

Não complique. Se funciona com 10 linhas, não faça com 50.

### DRY (Don't Repeat Yourself)

Constantes em `lib/constants.ts`. Lógica repetida vira hook ou util.

### Single Responsibility

Um componente, uma responsabilidade. Se tá fazendo muita coisa, quebre.

## TypeScript

### Tipar tudo

```typescript
// ✅ Bom
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
}

// ❌ Ruim
function formatCurrency(amount: any) {
  return; // ...
}
```

### Evite `any`

Use `unknown` se não souber o tipo. Ou melhor: descubra o tipo.

### Types vs Interfaces

Preferimos `interface` pra objetos, `type` pra unions e aliases.

```typescript
interface User {
  id: string;
  name: string;
}

type Status = "pending" | "completed" | "failed";
```

## React

### Componentes funcionais

Sempre. Sem class components.

### forwardRef

Só quando precisa de ref (inputs pra forms). Outros componentes são funções simples.

```typescript
// Input precisa de ref
export const Input = forwardRef<HTMLInputElement, InputProps>(...)

// Button não precisa
export function Button({ children, onClick }: ButtonProps) {...}
```

### Props destructuring

No parâmetro da função, não no corpo.

```typescript
// ✅ Bom
function Button({ variant, children }: ButtonProps) {
  return <button className={styles[variant]}>{children}</button>
}

// ❌ Ruim
function Button(props: ButtonProps) {
  const { variant, children } = props
  return <button className={styles[variant]}>{children}</button>
}
```

## Tailwind

### Só Tailwind

Nada de CSS modules, styled-components, ou CSS puro.

### Classes longas

Use template literals pra organizar:

```tsx
<div className={`
  flex items-center gap-4
  p-4 rounded-lg
  bg-white dark:bg-gray-800
  ${isActive ? 'border-primary' : 'border-gray-200'}
`}>
```

## Comentários

- **Português** com teor explicativo
- **Só quando necessário** - código bom se explica
- **Foco em decisões técnicas** - o "porquê", não o "o quê"

```typescript
// Usamos infinite query ao invés de paginação tradicional
// pra UX mais fluida no mobile
export function useTransactions(filters) {
  return useInfiniteQuery({...})
}
```

## Imports

Ordem:

1. React/Next
2. Libs externas
3. @repo/\* (packages internos)
4. @/\* (aliases locais)
5. Tipos

```typescript
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@repo/ui";
import { transactionService } from "@/services";
import type { Transaction } from "@repo/types";
```
