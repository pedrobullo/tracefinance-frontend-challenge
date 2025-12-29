# API Gateway

## Decisão

Usamos **Next.js API Routes** como gateway.

## Fluxo

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │ ──→ │  Next.js    │ ──→ │  External   │
│  (browser)  │     │  (gateway)  │     │  API        │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Benefícios

- **CORS**: evita problemas de cross-origin
- **Segurança**: API keys não expostas no client
- **Transformação**: normaliza respostas
- **Caching**: controle de cache no edge

## Escalabilidade

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   CDN/Edge  │ ──→ │   Load      │ ──→ │  Next.js    │
│             │     │  Balancer   │     │  (replicas) │
└─────────────┘     └─────────────┘     └─────────────┘
```

- **Rate limiting**: implementar no edge ou via middleware
- **Load balancer**: distribuir entre instâncias
- **Cache**: Redis para respostas frequentes

## Melhorias Futuras

- [ ] Implementar rate limiting
- [ ] Adicionar circuit breaker
- [ ] Logging centralizado
- [ ] Métricas de latência

---

[← Voltar](./README.md)
