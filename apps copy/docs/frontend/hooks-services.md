# Hooks & Services

## Services (Camada HTTP)

### apiCall

O wrapper base pra todas as chamadas HTTP.

```typescript
// services/api.ts
export async function apiCall<T>({
  endpoint,
  method = 'GET',
  body,
  params,
}: ApiCallConfig<T>): Promise<T> {
  const url = `/api${endpoint}${buildQueryString(params)}`
  
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    toast.error(data.message || 'Erro')
    throw data
  }

  return data
}
```

**Por que centralizar?**
- Headers padrão em um lugar só
- Tratamento de erro consistente
- Toasts automáticos
- Fácil de adicionar auth depois

### Service específico

```typescript
// services/transactions.ts
export const transactionService = {
  list: (filters) => 
    api.get<TransactionsResponse>('/transactions', filters),
  
  create: (payload) => 
    api.post<Transaction>('/transactions', payload),
}
```

## Hooks (React Query)

### useTransactions

```typescript
export function useTransactions(filters) {
  return useInfiniteQuery({
    queryKey: ['transactions', 'list', filters],
    queryFn: ({ pageParam = 1 }) => 
      transactionService.list({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
  })
}
```

**O que você ganha:**
- Cache automático
- Infinite scroll com `fetchNextPage()`
- `isLoading`, `isError`, `data`... tudo pronto

### useCreateTransaction

```typescript
export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: transactionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions'])
      toast.success('Transação criada!')
    },
  })
}
```

**Uso no componente:**
```tsx
const { mutate, isPending } = useCreateTransaction()

<Button 
  loading={isPending}
  onClick={() => mutate(formData)}
>
  Criar
</Button>
```

## Fluxo completo

```
Componente
    ↓ chama hook
useTransactions(filters)
    ↓ usa service
transactionService.list(filters)
    ↓ usa apiCall
apiCall({ endpoint: '/transactions', params: filters })
    ↓ fetch
GET /api/transactions?page=1
    ↓ BFF
backendFetch('/transactions')
    ↓
Backend real
```

Cada camada tem uma responsabilidade. Componente não sabe de HTTP, service não sabe de cache.
