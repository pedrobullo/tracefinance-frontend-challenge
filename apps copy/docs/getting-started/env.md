# Variáveis de Ambiente

Crie o arquivo `apps/web/.env.local`:

```bash
# Backend (server-side only - NÃO expor ao client)
BACKEND_URL=https://sua-api-aqui.com

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_I18N=true
```

## Por que BACKEND_URL não tem NEXT_PUBLIC?

Segurança básica. Variáveis com `NEXT_PUBLIC_` são expostas no bundle do client - qualquer um vê no DevTools.

A URL do backend fica só no servidor (BFF), nunca chega no browser.

## Feature Flags

Por enquanto usamos env vars simples. Funciona bem pra projetos menores.

| Flag | Default | Descrição |
|------|---------|-----------|
| `NEXT_PUBLIC_ENABLE_DARK_MODE` | `true` | Toggle de dark mode |
| `NEXT_PUBLIC_ENABLE_I18N` | `true` | Seletor de idioma |

### Futuro

Pra escalar, considere:
- **LaunchDarkly** - Enterprise, completo
- **Flagsmith** - Open source
- **Unleash** - Self-hosted

Essas ferramentas permitem toggle em tempo real, rollout gradual, A/B testing...
