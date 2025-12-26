# API Endpoints

## Base

Todas as chamadas passam pelo BFF:

```
/api/transactions
```

O BFF faz proxy pro backend real (URL configurada via `BACKEND_URL`).

## Transações

### Listar

```
GET /api/transactions
```

**Query params:**

| Param | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `page` | number | 1 | Página atual |
| `limit` | number | 20 | Itens por página (max 100) |
| `search` | string | - | Busca por descrição/ID |
| `status` | string | - | COMPLETED, PENDING, FAILED |
| `currency` | string | - | BRL, USD, EUR |
| `startDate` | string | - | Data início (ISO 8601) |
| `endDate` | string | - | Data fim (ISO 8601) |

**Resposta:**

```json
{
  "data": [
    {
      "id": "tx-1",
      "description": "Pagamento fornecedor",
      "type": "PIX",
      "amount": 150000,
      "currency": "BRL",
      "status": "COMPLETED",
      "createdAt": "2024-12-08T10:30:00.000Z",
      "cpfCnpj": "12345678901",
      "pixKey": "email@example.com",
      "keyType": "EMAIL"
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "previousCursor": null,
    "nextCursor": 2
  }
}
```

### Criar

```
POST /api/transactions
```

**Body PIX:**

```json
{
  "type": "PIX",
  "amount": 150000,
  "cpfCnpj": "12345678901",
  "pixKey": "email@example.com",
  "keyType": "EMAIL",
  "description": "Opcional"
}
```

**Body TED:**

```json
{
  "type": "TED",
  "amount": 250000,
  "cpfCnpj": "12345678000190",
  "bank": "001",
  "account": "12345-6",
  "agency": "0001",
  "accountType": "CORRENTE",
  "description": "Opcional"
}
```

**Resposta (201):**

```json
{
  "id": "tx-16",
  "type": "PIX",
  "amount": 150000,
  "currency": "BRL",
  "status": "PENDING",
  "createdAt": "2024-12-09T10:00:00.000Z"
}
```

**Erro (400):**

```json
{
  "status": 400,
  "message": "Validation error",
  "errors": [
    { "field": "amount", "message": "Must be greater than 0" }
  ]
}
```

## Enums

### Status
- `COMPLETED` - Concluída
- `PENDING` - Pendente
- `FAILED` - Falhou

### Tipo de transação
- `PIX`
- `TED`

### Tipo de chave PIX
- `EMAIL`
- `PHONE`
- `CPF`
- `CNPJ`
- `RANDOM`

### Tipo de conta (TED)
- `CORRENTE`
- `POUPANCA`

### Moeda
- `BRL`
- `USD`
- `EUR`

## Notas

- **Amount**: Sempre em centavos (150000 = R$ 1.500,00)
- **CPF**: 11 dígitos
- **CNPJ**: 14 dígitos
- **Datas**: ISO 8601 format
