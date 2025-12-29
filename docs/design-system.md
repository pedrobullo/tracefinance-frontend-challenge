# Design System & Tokens

## Fluxo de Tokens

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Figma     │ ──→ │  tokens.css  │ ──→ │   Tailwind   │
│   (source)   │     │  (variáveis) │     │   (classes)  │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Implementação

Os tokens do Figma foram extraídos manualmente para `tokens.css` como CSS custom properties.

```css
:root {
  --color-primary: #...;
  --spacing-md: 16px;
}
```

> **Nota**: O plugin de tokens do Figma não estava ativo. Em produção, usar libs como `style-dictionary` ou `figma-tokens` para automação.

## Automação (Recomendado)

```
Figma Tokens Plugin → JSON → style-dictionary → tokens.css
```

**Benefícios**:

- Comunicação direta Produto ↔ Developer
- Single source of truth
- Atualização automática

## Dark Mode

Tokens provisórios criados para dark mode via CSS custom properties com seletor `[data-theme="dark"]`.

## Melhorias Futuras

- [ ] Integrar `style-dictionary` para geração automática
- [ ] Sync tokens via Figma API
- [ ] Documentação visual de tokens no Storybook
- [ ] Tokens semânticos (ex: `--color-error` → `--color-danger`)

---

[← Voltar](./README.md)
