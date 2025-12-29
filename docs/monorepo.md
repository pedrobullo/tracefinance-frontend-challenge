# Monorepo & Estrutura

## Decisão

Utilizar **Turborepo** é perfeito para simular um ambiente real de packages reutilizáveis. O foco foi alinhar tokens e melhorar a DX e mostrar como é possível facilitar a sinergia entre UI e developer.

**Princípio**: minimizar diversidade de libs, priorizando estratégias nativas.

## Fluxo

```
┌─────────────────────────────────────────────────────────┐
│                      MONOREPO                           │
├─────────────────────────────────────────────────────────┤
│  apps/                                                  │
│  ├── web/          → Next.js App (main)                 │
│  └── storybook/    → Documentação de componentes        │
├─────────────────────────────────────────────────────────┤
│  packages/                                              │
│  ├── ui/              → Componentes React               │
│  ├── tailwind-config/ → Tokens + Theme + Styles         │
│  ├── types/           → Tipos compartilhados            │
│  ├── eslint-config/   → Regras de lint                  │
│  └── typescript-config/ → TSConfig base                 │
└─────────────────────────────────────────────────────────┘
```

## Packages

| Package             | Descrição                                                | Libs                         |
| ------------------- | -------------------------------------------------------- | ---------------------------- |
| `ui`                | Componentes React reutilizáveis                          | `tailwind-variants`, `react` |
| `tailwind-config`   | [Tokens CSS](./design-system.md), theme, estilos globais | `tailwindcss`                |
| `types`             | Tipos TypeScript compartilhados                          | -                            |
| `eslint-config`     | Configuração ESLint base e Next.js                       | `eslint`                     |
| `typescript-config` | TSConfig base para herança                               | -                            |

## Melhorias Futuras (Monorepo)

- [ ] Novos pacotes compartilhados como `@repo/utils` para funções utilitárias ou `@repo/api` para contratos de API
- [ ] Dockerfile multi-stage para containerização

---

[← Voltar](./README.md)
