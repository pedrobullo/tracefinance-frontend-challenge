# Localização & Formatação

## Problema

Formatação de datas, moedas e números varia por região. Timezone causa inconsistências.

## Fluxo

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   API       │ ──→ │   Client    │ ──→ │   Display   │
│  (Zulu/UTC) │     │  (locale)   │     │  (formatted)│
└─────────────┘     └─────────────┘     └─────────────┘
```

## Estratégia

1. **API sempre retorna Zulu time** (UTC, sufixo `Z`)
2. **Client formata** de acordo com locale do usuário
3. **Usa `Intl` nativo** para formatação

```tsx
// Data
new Intl.DateTimeFormat(locale).format(new Date(zuluDate));

// Moeda
new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "BRL",
}).format(amount);
```

## Problemas Conhecidos

- **Timezone offset**: sempre usar UTC no servidor.
- **Timezone**: Double-parsing de datas pode causar off-by-one (UTC -> local -> UTC).
- **Locale do dado vs display**: usar locale do dado para parsing, locale do usuário para display

## Melhorias Futuras

- [ ] Lib `date-fns` ou `dayjs` para manipulação complexa
- [ ] Timezone picker configurável para usuários

---

[← Voltar](./README.md)
