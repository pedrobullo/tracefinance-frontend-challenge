# Stack & Libs

## Core

| Lib | Versão | Pra que |
|-----|--------|---------|
| **Next.js** | 16 | Framework React, App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5.x | Type safety |

## Estilização

| Lib | Pra que |
|-----|---------|
| **Tailwind CSS v4** | Utility-first CSS |
| **Design tokens** | Via `@theme` no CSS |

Nada de CSS modules, styled-components ou CSS puro. **Só Tailwind**.

## Estado & Data Fetching

| Lib | Pra que |
|-----|---------|
| **React Query** | Estado do servidor, cache, infinite scroll |
| **React Context** | Estado global simples (theme, i18n) |

Por que React Query?
- Cache automático
- Revalidação inteligente
- Infinite scroll built-in
- DevTools excelentes

## Formulários

| Lib | Pra que |
|-----|---------|
| **React Hook Form** | Gerenciamento de forms |
| **Zod** | Validação de schemas |
| **react-number-format** | Máscaras (CPF, moeda...) |

## UI & Ícones

| Lib | Pra que |
|-----|---------|
| **Heroicons** | Ícones (mantido pela Tailwind Labs) |
| **react-toastify** | Notificações toast |

## i18n

| Lib | Pra que |
|-----|---------|
| **i18next** | Internacionalização |
| **Custom LanguageProvider** | Context pra trocar idioma |

## Testes

| Lib | Pra que |
|-----|---------|
| **Jest** | Test runner |
| **Testing Library** | Testes de componente |

## Dev Tools

| Lib | Pra que |
|-----|---------|
| **Turborepo** | Monorepo, builds paralelos |
| **ESLint** | Linting |
| **Prettier** | Formatação |
| **Storybook** | Documentação de componentes |

## Por que essas escolhas?

### Tailwind v4
O novo sistema de tokens via `@theme` é mais limpo. Sem arquivo de config gigante.

### React Query > Zustand/Redux
Pra estado do **servidor** (dados da API), React Query é superior. Cache, revalidação, loading states... tudo de graça.

Zustand/Redux servem pra estado **local** complexo. No nosso caso, Context resolve.

### Heroicons
Mantido pela mesma equipe do Tailwind. Consistência visual garantida.
