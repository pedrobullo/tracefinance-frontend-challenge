# BFF Pattern

## O que é BFF?

**Backend for Frontend** - uma camada intermediária entre o frontend e o backend real.

No nosso caso: as rotas `/api/*` do Next.js.

## Por que usar?

### 1. Segurança
URL do backend nunca exposta ao client. Tokens, API keys... tudo fica no servidor.

### 2. Flexibilidade
Podemos transformar dados, agregar endpoints, adicionar cache... sem depender do backend.

### 3. CORS
Sem problemas de CORS porque o browser só fala com o próprio domínio.

## Como funciona

```
Client (browser)
    ↓
fetch('/api/transactions')
    ↓
Next.js API Route (BFF)
    ↓
backendFetch('/transactions')
    ↓
Backend real
```

## Implementação

### O utilitário `backendFetch`

```typescript
// lib/backend.ts
const BACKEND_URL = process.env.BACKEND_URL

export async function backendFetch(
  endpoint: string,
  options: BackendFetchOptions = {}
): Promise<NextResponse> {
  const url = `${BACKEND_URL}/api${endpoint}`
  
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  return NextResponse.json(await response.json(), { 
    status: response.status 
  })
}
```

### API Routes

```typescript
// app/api/transactions/route.ts
import { backendFetch } from '@/lib/backend'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  return backendFetch('/transactions', { params: searchParams })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return backendFetch('/transactions', { method: 'POST', body })
}
```

Super limpo. A rota só faz o proxy, toda lógica de conexão fica centralizada.

## Frontend consome normalmente

O `apiCall` do frontend não sabe que existe um BFF. Ele só chama `/api/transactions` e recebe os dados.

```typescript
// services/api.ts
const API_BASE_URL = '' // vazio = mesmo domínio
const API_PREFIX = '/api'

// Resultado: fetch('/api/transactions')
```

Desacoplamento total. Se amanhã trocarmos o backend, só mudamos o BFF.
