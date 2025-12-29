# Error Handling & Debugging

Estratégia de tratamento de erros e debugging da aplicação.

---

## ✅ Implementado

### Package `@repo/logger`

Logger centralizado no monorepo com suporte a múltiplos transports:

```
packages/logger/
├── package.json
└── src/
    ├── index.ts
    ├── logger.ts
    ├── types.ts
    └── transports/
        ├── index.ts
        └── console.ts
```

**Uso:**

```typescript
import { logger } from "@repo/logger";

// Níveis disponíveis
logger.debug("API Request", { requestId, endpoint });
logger.info("Transaction created", { amount });
logger.warn("API Error Response", { status: 400 });
logger.error("Failed to submit", error, { component: "Form" });
```

### Pontos Críticos com Logging

**1. API Layer (`services/api/api.ts`):**

```typescript
import { logger } from "@repo/logger";

export async function apiCall<T>({ endpoint, method }: ApiCallConfig): Promise<T> {
  const requestId = crypto.randomUUID();

  logger.debug("API Request", { requestId, endpoint, method });

  try {
    const response = await fetch(url, { ... });

    if (!response.ok) {
      logger.warn("API Error Response", { requestId, endpoint, status: response.status });
      throw error;
    }

    logger.debug("API Success", { requestId, endpoint });
    return data as T;
  } catch (error) {
    logger.error("API Network Error", error, { requestId, endpoint });
    throw networkError;
  }
}
```

**2. Hooks (`hooks/usePersistentState.ts`):**

```typescript
import { logger } from "@repo/logger";

// localStorage errors
logger.error(`Error loading ${key} from localStorage`, error, {
  component: "usePersistentState",
  key,
});
```

**3. Components (`TransactionFormModal.tsx`):**

```typescript
import { logger } from "@repo/logger";

// Form submission errors
logger.error("Failed to submit transaction", error, {
  component: "TransactionFormModal",
});
```

### Arquitetura do Logger

```typescript
// packages/logger/src/types.ts
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  component?: string;
  action?: string;
  requestId?: string;
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: { message: string; stack?: string };
}
```

**Features:**

- Níveis de log configuráveis (`debug` em dev, `info` em prod)
- Context propagation (component, action, requestId)
- Stack traces capturados automaticamente
- Transport pattern para extensibilidade

---

## 🔜 Melhorias Futuras

### 1. Error Boundary (Componentes)

Next.js suporta Error Boundaries via arquivos especiais:

```
app/
├── error.tsx          # Error boundary para rotas
├── global-error.tsx   # Fallback global
└── [locale]/
    └── transactions/
        └── error.tsx  # Error boundary específico
```

**Exemplo:**

```typescript
"use client";

import { useEffect } from "react";
import { logger } from "@repo/logger";

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error("Component render failed", error, {
      component: "ErrorBoundary",
      digest: error.digest,
    });
  }, [error]);

  return (
    <div>
      <h2>Algo deu errado</h2>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}
```

### 2. HTTP Transport (Produção)

```typescript
// packages/logger/src/transports/http.ts
export class HttpTransport implements LoggerTransport {
  constructor(private endpoint: string) {}

  log(entry: LogEntry): void {
    fetch(this.endpoint, {
      method: "POST",
      body: JSON.stringify(entry),
    }).catch(() => {});
  }
}
```

### 3. Integração OpenTelemetry

```typescript
// packages/logger/src/transports/otel.ts
import { trace } from "@opentelemetry/api";

export class OTelTransport implements LoggerTransport {
  log(entry: LogEntry): void {
    const span = trace.getActiveSpan();
    span?.addEvent(entry.message, entry.context);
  }
}
```

---

## 📊 Integração com Observabilidade

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Component  │────▶│ @repo/logger│────▶│  OTel/Loki  │
│  try/catch  │     │  (package)  │     │  Grafana    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │                   ▼
       │            ┌─────────────┐
       └───────────▶│   Clarity   │  (UX Replay)
                    └─────────────┘
```

---

## ✅ Checklist

| Item                             | Status          |
| -------------------------------- | --------------- |
| Package `@repo/logger`           | ✅ Implementado |
| Logging no `apiCall`             | ✅ Implementado |
| Logging em hooks críticos        | ✅ Implementado |
| Logging em componentes           | ✅ Implementado |
| `app/error.tsx` (Error Boundary) | ⬜ Pendente     |
| `app/global-error.tsx`           | ⬜ Pendente     |
| HTTP Transport                   | ⬜ Futuro       |
| Integração OpenTelemetry         | ⬜ Futuro       |

---

## 🔍 Debugging

### Request Tracking

Cada request HTTP possui um `requestId` único:

```
[DEBUG] API Request { requestId: "abc-123", endpoint: "/transactions", method: "GET" }
[DEBUG] API Success { requestId: "abc-123", endpoint: "/transactions" }
```

### React Query DevTools

```typescript
<ReactQueryDevtools initialIsOpen={false} />
```

---

## 📚 Referências

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Structured Logging](https://www.structlog.org/en/stable/why.html)
