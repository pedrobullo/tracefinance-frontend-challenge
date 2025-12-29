# Boas Práticas

## Princípios

### KISS (Keep It Simple, Stupid)

Soluções simples primeiro. Complexidade só quando necessário.

### DRY (Don't Repeat Yourself)

Extrair código repetido para funções/componentes reutilizáveis.

### SSOT (Single Source of Truth)

Uma única fonte para cada dado. Tokens no CSS, tipos no `@repo/types`.

## Código

```
┌─────────────────────────────────────────┐
│  ✓ Tipar tudo (evitar any)              │
│  ✓ Funções pequenas (< 20 linhas)       │
│  ✓ Early returns                        │
│  ✓ Nomes descritivos                    │
│  ✓ Const por padrão                     │
└─────────────────────────────────────────┘
```

## Componentes

```
┌─────────────────────────────────────────┐
│  ✓ Single Responsibility                │
│  ✓ Props tipadas                        │
│  ✓ Composição sobre herança             │
│  ✓ Extrair lógica para hooks            │
└─────────────────────────────────────────┘
```

## Git

- **Conventional Commits**: `feat:`, `fix:`, `chore:`
- **Branches**: `feature/`, `fix/`, `docs/`

## Git para produção

- **PRs pequenos**: mais fáceis de revisar

## Melhorias Futuras

- [ ] Husky + lint-staged
- [ ] Commitlint
- [ ] PR templates

---

[← Voltar](./README.md)
