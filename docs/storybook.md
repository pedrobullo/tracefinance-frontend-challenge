# Storybook

## Setup

Storybook é um dos apps do monorepo. Somente disponiveis para componentes reutilizáveis do package `ui`.

## Instalação

```bash
# Na raiz do monorepo
pnpm install
```

## Rodar

```bash
pnpm storybook
```

Acesse: **http://localhost:6006/**

## Estrutura

```
apps/storybook/
├── .storybook/
│   ├── main.ts      → Configuração
│   └── preview.ts   → Decorators globais
└── stories/
    └── *.stories.tsx → Stories dos componentes
```

## Melhorias Futuras

- [ ] Chromatic para visual regression
- [ ] Documentação MDX de boas práticas
- [ ] Deploy automático

---

[← Voltar](./README.md)
