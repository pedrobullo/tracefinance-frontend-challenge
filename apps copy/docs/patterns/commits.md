# Commits

## Conventional Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <subject>

[body]

[footer]
```

## Types

| Type | Quando usar |
|------|-------------|
| `feat` | Nova feature |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação (sem mudança de código) |
| `refactor` | Refatoração sem mudar comportamento |
| `perf` | Melhoria de performance |
| `test` | Testes |
| `chore` | Manutenção, deps, config |

## Scopes (opcional)

- `ui` - Package UI
- `web` - App web
- `api` - Camada de serviço
- `transactions` - Feature transações
- `i18n` - Internacionalização

## Exemplos

```bash
feat(transactions): add infinite scroll

Implements useInfiniteQuery for better UX on mobile.

# Fix
fix(api): handle network timeout

Adds retry logic for timeout scenarios.

# Refactor
refactor(ui): simplify Button component

# Docs
docs: update setup instructions

# Chore
chore(deps): update react-query to 5.x
```

## Boas práticas

### ✅ Faça

- Commits pequenos e focados
- Mensagem clara (o quê e porquê)
- Um commit = uma mudança lógica

### ❌ Evite

- Commits gigantes
- Mensagens tipo "WIP", "fix", "changes"
- Misturar features diferentes

## Template

```
<type>(<scope>): <ação no presente>

- O que foi feito
- Por que foi feito

Next: <próximo passo>
```

O "Next" ajuda no code review - o revisor sabe o que esperar.

## Workflow incremental

Feature grande? Quebre em commits pequenos:

1. **Estrutura** - Skeleton + feature flag
2. **UI** - Interface visual
3. **Integração** - Conecta com API
4. **Testes** - Adiciona testes
5. **Docs** - Documenta
6. **Enable** - Habilita em prod

Cada commit é revisável separadamente. Discussão focada.

## Ferramentas (opcional)

### Commitizen
```bash
pnpm add -D commitizen cz-conventional-changelog
pnpm commit  # wizard interativo
```

### Commitlint + Husky
Valida mensagens automaticamente no pre-commit.
