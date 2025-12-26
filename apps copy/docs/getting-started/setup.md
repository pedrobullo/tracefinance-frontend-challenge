# Setup Rápido

## Pré-requisitos

- Node.js >= 18
- pnpm >= 9.0.0

## Instalação

```bash
# Instala pnpm se não tiver
npm install -g pnpm

# Instala tudo
pnpm setup
```

Pronto. Sério, é só isso.

## Rodando

```bash
# Dev mode
pnpm dev

# Storybook (componentes UI)
pnpm storybook

# Testes
pnpm test

# Build
pnpm build
```

## Portas

- **Web**: http://localhost:3000
- **Storybook**: http://localhost:6006

## Problemas comuns

### Porta em uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Dependências quebradas

```bash
# Limpa e reinstala
rm -rf node_modules
pnpm install
```

Não funcionou? Chama no Slack 😄
