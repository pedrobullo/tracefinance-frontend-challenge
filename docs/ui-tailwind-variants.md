# UI com Tailwind Variants

## Decisão

**tailwind-variants** para testar uma alternativa ao CVA. É uma oportunidade de aprender algo novo.

> Para mais estabilidade, considerar **stitches** ou **pandaCSS**.

## Fluxo

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Component     │ ──→ │ tailwind-       │ ──→ │   Classes       │
│   (props)       │     │ variants (tv)   │     │   (merged)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Exemplo

```tsx
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'px-4 py-2 rounded',
  variants: {
    color: {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-black',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'sm',
  },
})

// Uso
<button className={button({ color: 'primary', size: 'lg' })}>
```

## Vantagens

- API CVA (Class Variance Authority)
- Merge inteligente de classes
- compoundVariants (variações logicas)
- TypeScript first

## Melhorias Futuras

- [ ] Definição das propriedades para melhorar a DX do time e alinhamento com figma

---

[← Voltar](./README.md)
