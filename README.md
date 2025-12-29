# Trace Finance Challenge - Transaction Management

Aplicação de gerenciamento de transações com formulário multi-step e listagem paginada.

---

## 📱 Demo

**https://tracefinance-frontend-challenge-web.vercel.app/**

## 📦 Instalação

```bash
# Requer Node.js 18+ e pnpm
pnpm install

# Build
pnpm build
```

## ⚙️ Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp apps/web/.env.example apps/web/.env.local
```

## ▶️ Rodar o Projeto

```bash
# Development
pnpm dev
```

Acesse: **http://localhost:3000**

## 🧪 Testes

```bash
# Rodar testes
pnpm test
```

## 📚 Storybook

```bash
pnpm storybook
```

Acesse: **http://localhost:6006**

---

## 🏗️ Decisões Técnicas

Documentação detalhada em [docs/](./docs/README.md):

| Tópico                     | Link                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| Monorepo & Estrutura       | [→ docs/monorepo.md](./docs/monorepo.md)                         |
| Design System & Tokens     | [→ docs/design-system.md](./docs/design-system.md)               |
| Theme Provider             | [→ docs/theme-provider.md](./docs/theme-provider.md)             |
| UI com Tailwind Variants   | [→ docs/ui-tailwind-variants.md](./docs/ui-tailwind-variants.md) |
| Internacionalização (i18n) | [→ docs/i18n.md](./docs/i18n.md)                                 |
| Localização & Formatação   | [→ docs/localization.md](./docs/localization.md)                 |
| API Gateway                | [→ docs/api-gateway.md](./docs/api-gateway.md)                   |
| Responsividade             | [→ docs/responsiveness.md](./docs/responsiveness.md)             |
| Storybook                  | [→ docs/storybook.md](./docs/storybook.md)                       |
| Boas Práticas              | [→ docs/best-practices.md](./docs/best-practices.md)             |
| Observabilidade            | [→ docs/observability.md](./docs/observability.md)               |

---

## ⏱️ Tempo de Desenvolvimento

**~25 horas** distribuídas em ~3 dias.

Ver breakdown: [→ docs/roadmap.md](./docs/roadmap.md)

---

## 🔮 Melhorias Futuras

Cada página de documentação contém melhorias específicas. Principais:

- [ ] Automação de tokens via Figma API
- [ ] Testes E2E com Playwright
- [ ] Deploy CI/CD com Turborepo cache (nova feature)
- [ ] Rate limiting no API Gateway
- [ ] Observabilidade

---

## 📖 API

Documentação da API: [API_README.md](./API_README.md)
