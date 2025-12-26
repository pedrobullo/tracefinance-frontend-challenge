# Visão Geral da Arquitetura

## Estrutura do Monorepo

```
trace/
├── apps/
│   ├── web/          # Next.js app principal
│   └── storybook/    # Documentação de componentes
└── packages/
    ├── ui/           # Componentes reutilizáveis
    ├── types/        # TypeScript types compartilhados
    └── eslint-config/# Config de lint compartilhada
```

## Por que Monorepo?

- **Compartilhamento de código** - `@repo/ui` e `@repo/types` usados em qualquer app
- **Versioning único** - Tudo sincronizado, sem conflitos de versão
- **DX melhor** - Um `pnpm install` e tá tudo pronto

Usamos **Turborepo** pra orquestrar builds e cache.

## Fluxo de Dados

```
Browser → Next.js BFF → Backend API
           ↓
       React Query (cache)
           ↓
       Components
```

O browser **nunca** fala direto com o backend. Sempre passa pelo BFF (Backend for Frontend) do Next.js.

## Camadas do App Web

| Camada       | Pasta         | Responsabilidade                      |
| ------------ | ------------- | ------------------------------------- |
| **UI**       | `components/` | Renderização, interação               |
| **Estado**   | `hooks/`      | React Query, lógica de negócio        |
| **Serviços** | `services/`   | Chamadas HTTP, transformação de dados |
| **BFF**      | `app/api/`    | Proxy pro backend, segurança          |

## Decisões Importantes

### Next.js App Router

Escolhemos App Router (não Pages) por ser o futuro do Next.js e ter melhor suporte a Server Components.

### Tailwind v4

Novo sistema de design tokens via `@theme` no CSS. Mais limpo que o tailwind.config.js.

### React Query

Estado do servidor separado do estado local. Cache automático, revalidação, infinite scroll de graça.
