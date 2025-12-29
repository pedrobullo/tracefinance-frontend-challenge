# Responsividade

## Breakpoints (Tailwind)

| Key  | Min Width | Uso              |
| ---- | --------- | ---------------- |
| `sm` | 640px     | Mobile landscape |
| `md` | 768px     | Tablet           |
| `lg` | 1024px    | Desktop          |
| `xl` | 1280px    | Large desktop    |

## Fluxo

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Mobile    │     │   Tablet    │     │   Desktop   │
│  (< 768px)  │     │  (768-1024) │     │  (> 1024)   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│  Stack      │     │  Hybrid     │     │  Sidebar    │
│  vertical   │     │  layout     │     │  + Content  │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Core Classes

```tsx
// Mobile first
<div className="flex flex-col md:flex-row">

// Hide/show
<div className="hidden md:block">

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## useMediaQuery

Para propriedades de componentes que não dependem de CSS:

```tsx
const isMobile = useMediaQuery('(max-width: 768px)')

<Table variant={isMobile ? 'compact' : 'default'} />
```

## Melhorias Futuras

- [ ] Centralização no package `ui`
- [ ] Wrapper de componentes responsivos

---

[← Voltar](./README.md)
