# Theme Provider

## Fluxo

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Cookie    │ ──→ │   Server    │ ──→ │   Client    │
│  (theme)    │     │  (SSR/SEO)  │     │  (hydrate)  │
└─────────────┘     └─────────────┘     └─────────────┘
        ↑                                     │
        └─────────────────────────────────────┘
                     (update)
```

## Estratégia

1. **Cookie de tema**: salvo no client, lido no server
2. **SSR**: tema aplicado antes do render
3. **Critical Path**: CSS inicial já com tema correto (evita piscadas)
4. **SEO**: meta tags corretas para tema

## Implementação

```tsx
// Server: lê cookie
const theme = cookies().get('theme')?.value || 'light'

// Layout: aplica no HTML
<html data-theme={theme}>
```

## Tailwind + CSS Variables

```css
[data-theme="light"] {
  --bg-primary: #ffffff;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
}
```

## Melhorias Futuras

- [ ] Criar uma terceira opção para detectar preferência do sistema e salvar no cookie algo como system-dark ou system-light.
- [ ] Transição suave entre temas

---

[← Voltar](./README.md)
