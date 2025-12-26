# Feature Flags

## Por que usar?

- **Deploy contínuo** - código sempre deployável, features incompletas escondidas
- **Rollback fácil** - desliga a flag, feature some
- **A/B testing** - habilita pra % dos usuários

## Implementação atual

Usamos variáveis de ambiente simples. Funciona bem pra projetos menores.

### Definir

```bash
# apps/web/.env.local
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_I18N=true
```

### Usar

```tsx
// contexts/FeatureProvider.tsx
export const featureFlags = {
  darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
  i18n: process.env.NEXT_PUBLIC_ENABLE_I18N === 'true',
}
```

```tsx
// No componente
{featureFlags.darkMode && <ThemeToggle />}
{featureFlags.i18n && <LanguageToggle />}
```

## Convenção de nomenclatura

```
NEXT_PUBLIC_ENABLE_<FEATURE_NAME>
```

Sempre com prefixo `ENABLE_` pra ficar claro que é boolean.

## Workflow

### 1. Feature nova → flag desabilitada
```bash
NEXT_PUBLIC_ENABLE_NEW_FILTERS=false
```

### 2. Desenvolve com flag habilitada local
```bash
# .env.local (não commitado)
NEXT_PUBLIC_ENABLE_NEW_FILTERS=true
```

### 3. Testa, revisa, aprova

### 4. Habilita em prod
```bash
# Vercel/Netlify env vars
NEXT_PUBLIC_ENABLE_NEW_FILTERS=true
```

### 5. Remove a flag depois de estável
Código legado:
```tsx
{featureFlags.newFilters && <NewFilters />}
```

Vira:
```tsx
<NewFilters />
```

## Limitações

Env vars são **estáticas** - precisa redeploy pra mudar.

## Próximos passos

Pra escalar, considere ferramentas dedicadas:

| Ferramenta | Tipo | Destaque |
|------------|------|----------|
| **LaunchDarkly** | SaaS | Enterprise, completo |
| **Flagsmith** | Open source | Self-hosted ou cloud |
| **Unleash** | Open source | Boa documentação |
| **GrowthBook** | Open source | Foco em A/B testing |

Vantagens:
- Toggle em tempo real (sem redeploy)
- Rollout gradual (10% → 50% → 100%)
- Segmentação por usuário/região
- Analytics de uso
