Voce tem um code challenge para finalizar, precisa criar um projeto seguindo o readme a baixo, analise tudo e verifique se precisamos melhorar o prompt ou podemos seguir no planejamento e execucao:

# 🚀 Front-end Challenge — Transaction Management

Desafio para avaliar engenheiros(as) front-end sênior na Trace Finance.

## 📋 Sobre este Desafio

Este desafio tem como objetivo avaliar suas habilidades em construir uma aplicação front-end moderna, escalável e testável, utilizando as principais tecnologias e padrões que adotamos na Trace Finance.

Figma do teste: https://www.figma.com/design/YXzBTEwElRuxRVssHg465f/Teste-t%C3%A9cnico?node-id=0-1&m=dev&t=0krnC3qtatApObzH-1

### 🔀 Como iniciar:

1. **Projeto novo**: Crie um projeto Next.js do zero (recomendado)
2. **Starter template**: Você pode usar qualquer template/boilerplate que preferir

---

## 📝 Contexto

Você deve construir uma aplicação de **gerenciamento de transações** com:

- ✅ **Formulário multi-step** para criar transações (2 etapas com sidebar)
- ✅ **Listagem paginada** com filtros, pesquisa e paginação

A aplicação deve ser responsiva, testável e seguir as melhores práticas de desenvolvimento front-end.

### 📦 O que forneceremos:

- ✅ Base URL da API com endpoints funcionais
- ✅ Documentação dos endpoints
- ✅ Exemplos de payloads

### 📊 Resumo Visual do Fluxo:

```
Listagem de Transações
    ├─→ Filtros (Status, Currency, Data)
    ├─→ Pesquisa
    ├─→ Paginação
    └─→ Botão "Nova Transação"
         ↓
    Formulário Multi-Step
         ├─→ Step 1: Info Básicas (Descrição, Tipo, Valor, CPF/CNPJ)
         └─→ Step 2: Detalhes (campos condicionais por tipo)
              ↓
         Submissão → API → Redirect para Listagem
```

---

## 🛠 Tecnologias (obrigatórias)

### Core Stack

- **Framework**: Next.js 14+ (App Router ou Pages Router)
- **Linguagem**: TypeScript
- **Gerenciamento de Estado**: Zustand, Redux Toolkit ou Context API + hooks
- **Formulários**: React Hook Form + Yup/Zod (validação)
- **HTTP Client**: Axios, Fetch API, React query (diferencial) ou biblioteca de sua escolha
- **Estilização**: Styled Components, Tailwind CSS, Stitches, PandaCSS, etc.

### Testing

- **Testes Unitários/Integração**: Jest + Testing Library

### Código e Qualidade

- **Linting**: ESLint com regras TypeScript
- **Formatação**: Prettier
- **Commits**: Conventional Commits (recomendado)

---

## 🎯 Funcionalidades Obrigatórias

### 1. Listagem de Transações (Página Principal)

#### Interface

**Tabela com colunas:**

- ID
- Tipo (PIX/TED)
- Valor (formatado em BRL)
- Status (badge colorido)
- Data/Hora

**Funcionalidades obrigatórias:**

1. **Paginação**

   - Controles: Infinite Scroll
   - Exibir "Mostrando X-Y de Z resultados"

2. **Filtros:**

   - **Status** (Tab): Todos, Completed, Pending, Failed
   - **Tipo** (select/dropdown): PIX, TED
   - **Data** (date range picker): Período, de -> até, mês de inicio, mês de fim
   - Botão "Aplicar Filtros"
   - Botão "Limpar Filtros"
   - Mostrar filtros ativos com componente de Badge

3. **Estados:**

   - Loading (skeleton table)
   - Empty state (sem resultados)
   - Error state (falha na API)

5. **Botão "Nova Transação"**
   - Redireciona para o formulário multi-step

---

### 2. Formulário Multi-Step (Criar Transação)

Formulário com **2 etapas** e **sidebar lateral** indicando o step atual.

#### Layout do Formulário

**Desktop:**

```
┌─────────────────┬──────────────────────────────┐
│  Sidebar        │  Área Principal              │
│                 │                              │
│  ● Step 1       │  [Campos do Step Ativo]      │
│    Informações  │                              │
│                 │                              │
│  ○ Step 2       │                              │
│    Detalhes     │                              │
│                 │                              │
│                 │[Voltar] [Próximo/Confirmar]  │
└─────────────────┴──────────────────────────────┘
```

**Mobile:**

- Sidebar pode ficar horizontal no topo ou como stepper
- Campos empilhados verticalmente

**Navegação:**

- Botão "Voltar": Retorna ao step anterior (ou página de listagem se no Step 1)
- Botão "Próximo" (Step 1): Avança para Step 2
- Botão "Confirmar" (Step 2): Submete o formulário

#### Step 1 - Informações Básicas

**Campos:**

1. **Descrição** (input texto, **opcional**)
2. **Tipo de Transação** (select, **obrigatório**)
   - Opções: `PIX`, `TED`
3. **Valor** (input texto, **obrigatório**, máscara de moeda BRL) BE trabalha em centavos
4. **CPF/CNPJ** (input texto com máscara, **obrigatório**)

**Comportamento:**

- Botão "Próximo" habilitado apenas com campos obrigatórios válidos
- Validação em tempo real (mostrar erros abaixo dos campos)
- Não permitir avançar com campos inválidos

#### Step 2 - Detalhes da Transação

**Campos condicionais baseados no "Tipo de Transação" do Step 1:**

**Se PIX:**

- Chave PIX (input texto, obrigatório)
- Tipo de Chave (select: CPF, Email, Telefone, Aleatória)

**Se TED:**

- Banco (select com lista de bancos)
- Agência (input texto, obrigatório)
- Conta (input texto, obrigatório)
- Tipo de Conta (select: Corrente, Poupança)

**Comportamento:**

- **"Voltar"**: Retorna ao Step 1 com todos os dados preservados
- **"Confirmar"**: Envia os dados para a API (endpoint fornecido)
  - Modal de confirmação (diferencial)
  - Após sucesso: Redireciona para listagem
  - Após erro: Exibe mensagem de erro
- **Ao retornar para o formulário após confirmação**: Campos limpos (reset completo)

**Validações:**

- Todos os campos condicionais devem ter validação apropriada
- Exibir mensagens de erro abaixo dos campos

---

## 🌐 API (Fornecida)

### Endpoints que forneceremos:

Api base url: `https://fe-challenge-trace-api-production.up.railway.App`
Api prefix: `/api`

Endpoints: `/transaction` (GET, POST)

Todas as informações da api podem ser encontradas em [API_README.md](API_README.md)

#### `GET /api/transactions`

**Query Params:**

- `page` (number): Página atual
- `limit` (number): Items por página
- `search` (string): Busca por descrição/ID
- `status` (string): COMPLETED | PENDING | FAILED
- `currency` (string): BRL | USD | EUR
- `startDate` (string): Data início (ISO 8601)
- `endDate` (string): Data fim (ISO 8601)

Mostrar filtro ativo em formato de Badge

---

## 🎨 UI/UX Requirements

### Design System

- Usar theme
- Tokens para cores, fontes, etc.
- Dark mode (diferencial)
- Criar componentes customizados básicos

### Componentes Necessários

- `Button` (primary, secondary)
- `Input` / `InputMask` (para CPF/CNPJ, moeda)
- `Select` / `Dropdown`
- `DatePicker` (para filtro de data)
- `Badge` (para status)
- `Table`
- `Skeleton` (loading states)
- `EmptyState`
- `Sidebar` (para o multi-step form)

### Responsividade

- **Mobile** (< 768px): Stack vertical, sidebar do form pode ser horizontal no topo
- **Desktop** (≥ 768px): Layout padrão com sidebar lateral
- Tabela responsiva (scroll horizontal em mobile ou cards)

## 🏗 Arquitetura e Boas Práticas

### Padrões de Código

- ✅ **DRY**: Não repetir código
- ✅ **Single Responsibility**: Componentes com responsabilidade única
- ✅ **Custom Hooks**: Extrair lógica reutilizável
- ✅ **Type Safety**: Tipar tudo (evitar `any`)
- ✅ **Validações**: Usar schemas (Yup/Zod)
- ✅ **Error Handling**: Tratamento apropriado de erros

## 🧪 Testes (Jest + Testing Library)

## 📝 Pré-requisitos

- ✅ Repositório privado no GitHub
- ✅ TypeScript configurado
- ✅ Next.js 14+
- ✅ Todas as 3 funcionalidades implementadas:
  - Formulário multi-step completo
  - Listagem com filtros, pesquisa e paginação
- ✅ Testes unitários
- ✅ Formulários com validação
- ✅ Gerenciamento de estado
- ✅ Loading, error e empty states
- ✅ Responsivo (mobile e desktop)
- ✅ README com:
  - Instruções de instalação
  - Como rodar o projeto
  - Como rodar os testes
  - Variáveis de ambiente necessárias
- ✅ Lint sem erros
- ✅ Testes passando (`yarn test` ou `npm test`)

---

## 🌟 Diferenciais (Seria Legal Ter)

### Código e Arquitetura

- 🎯 Arquitetura modular bem organizada (feature-based)
- 🎯 Custom hooks bem abstraídos e reutilizáveis
- 🎯 Error Boundary implementado
- 🎯 Abstrações de serviços HTTP (camada de API bem estruturada)
- 🎯 Path aliases configurados no TypeScript
- 🎯 Documentação de componentes (Storybook ou similar)

### UX/UI

- ✨ Dark mode
- ✨ Botão para alteração de lingua
- ✨ Animações e transições suaves
- ✨ Toast notifications (feedback de ações)
- ✨ Confirmação antes de submeter formulário
- ✨ Skeleton screens customizados

### Testing e Qualidade

- 🧪 Cobertura de testes
- 🔧 Husky + lint-staged
- 🔧 Commitlint

### Extras

- 🌐 Internacionalização (PT/EN) - i18n
- 🚀 Deploy em produção (Vercel, Netlify, etc.)

---

# Serviço de API de Transações

Uma API REST baseada em TypeScript para gerenciar transações financeiras com suporte para tipos de pagamento PIX e TED.

A API estará disponível em `https://fe-challenge-trace-api-production.up.railway.App`.

## Endpoints da API

### Health Check

```
GET /health
```

**Resposta:**

```json
{
  "status": "ok",
  "timestamp": "2024-12-09T10:00:00.000Z"
}
```

### Listar Transações

```
GET /api/transactions
```

**Parâmetros de Query:**

| Parâmetro   | Tipo   | Obrigatório | Padrão | Descrição                                            |
| ----------- | ------ | ----------- | ------ | ---------------------------------------------------- |
| `page`      | number | Não         | 1      | Número da página atual                               |
| `limit`     | number | Não         | 20     | Itens por página (máx: 100)                          |
| `search`    | string | Não         | -      | Buscar por descrição ou ID da transação              |
| `status`    | string | Não         | -      | Filtrar por status: `COMPLETED`, `PENDING`, `FAILED` |
| `currency`  | string | Não         | -      | Filtrar por moeda: `BRL`, `USD`, `EUR`               |
| `startDate` | string | Não         | -      | Filtrar a partir da data (formato ISO 8601)          |
| `endDate`   | string | Não         | -      | Filtrar até a data (formato ISO 8601)                |

**Exemplo de Requisição:**

```bash
curl "http://localhost:8080/api/transactions?page=1&limit=10&status=COMPLETED&currency=BRL"
```

**Resposta:**

```json
{
  "data": [
    {
      "id": "tx-1",
      "description": "Pagamento fornecedor",
      "type": "PIX",
      "amount": 150000,
      "currency": "BRL",
      "status": "COMPLETED",
      "createdAt": "2024-12-08T10:30:00.000Z",
      "cpfCnpj": "12345678901",
      "pixKey": "fornecedor@email.com",
      "keyType": "EMAIL"
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "previousCursor": null,
    "nextCursor": 2
  }
}
```

**Cursores de Paginação:**

- `previousCursor`: Número da página anterior (`null` se estiver na primeira página)
- `nextCursor`: Número da próxima página (`null` se estiver na última página)

### Criar Transação

```
POST /api/transactions
```

**Corpo da Requisição:**

#### Transação PIX

```json
{
  "type": "PIX",
  "amount": 150000,
  "cpfCnpj": "12345678901",
  "pixKey": "example@email.com",
  "keyType": "EMAIL",
  "description": "Descrição opcional"
}
```

**Campos obrigatórios:**

- `type` - Deve ser `"PIX"`
- `amount` - Inteiro em centavos (ex: 150000 = R$ 1.500,00)
- `cpfCnpj` - CPF (11 dígitos) ou CNPJ (14 dígitos)
- `pixKey` - Valor da chave PIX
- `keyType` - Um de: `EMAIL`, `PHONE`, `CPF`, `CNPJ`, `RANDOM`

**Campos opcionais:**

- `description` - Descrição da transação

#### Transação TED

```json
{
  "type": "TED",
  "amount": 250000,
  "cpfCnpj": "12345678000190",
  "bank": "001",
  "account": "12345-6",
  "agency": "0001",
  "accountType": "CORRENTE",
  "description": "Descrição opcional"
}
```

**Campos obrigatórios:**

- `type` - Deve ser `"TED"`
- `amount` - Inteiro em centavos
- `cpfCnpj` - CPF (11 dígitos) ou CNPJ (14 dígitos)
- `bank` - Código do banco
- `account` - Número da conta
- `agency` - Número da agência
- `accountType` - Um de: `CORRENTE`, `POUPANCA`

**Campos opcionais:**

- `description` - Descrição da transação

**Resposta de Sucesso (201 Created):**

```json
{
  "id": "tx-16",
  "type": "PIX",
  "amount": 150000,
  "currency": "BRL",
  "status": "PENDING",
  "createdAt": "2024-12-09T10:00:00.000Z",
  "cpfCnpj": "12345678901",
  "pixKey": "example@email.com",
  "keyType": "EMAIL",
  "description": "Descrição opcional"
}
```

**Resposta de Erro (400 Bad Request):**

```json
{
  "status": 400,
  "message": "Validation error",
  "errors": [
    {
      "field": "amount",
      "message": "Number must be greater than 0"
    }
  ]
}
```

## Regras de Validação

### CPF/CNPJ

- CPF: Exatamente 11 dígitos
- CNPJ: Exatamente 14 dígitos
- Validação apenas de formato (sem verificação de dígitos verificadores)

### Valor

- Deve ser um inteiro positivo
- Armazenado em centavos (ex: 100 = R$ 1,00)

### Tipo de Transação

A API valida campos obrigatórios com base no tipo de transação:

**PIX:** Requer `pixKey` e `keyType`
**TED:** Requer `bank`, `account`, `agency` e `accountType`

## Valores de Enum

A API usa os seguintes valores de enum para vários campos. Use esses valores exatos ao criar transações ou filtrar:

### Tipo de Transação

| Valor | Descrição                 |
| ----- | ------------------------- |
| `PIX` | Tipo de pagamento PIX     |
| `TED` | Tipo de transferência TED |

### Status da Transação

| Valor       | Descrição                       |
| ----------- | ------------------------------- |
| `COMPLETED` | Transação concluída com sucesso |
| `PENDING`   | Transação pendente              |
| `FAILED`    | Transação falhou                |

**Uso:** Filtrar transações por status no parâmetro de query `?status=COMPLETED`

### Moeda

| Valor | Descrição       |
| ----- | --------------- |
| `BRL` | Real Brasileiro |
| `USD` | Dólar Americano |
| `EUR` | Euro            |

**Uso:** Filtrar transações por moeda no parâmetro de query `?currency=BRL`

### Tipo de Chave PIX

Usado ao criar transações PIX (campo `keyType`):

| Valor    | Descrição              | Exemplo                                |
| -------- | ---------------------- | -------------------------------------- |
| `EMAIL`  | Endereço de e-mail     | `user@example.com`                     |
| `PHONE`  | Número de telefone     | `+5511987654321`                       |
| `CPF`    | Número do CPF          | `12345678901`                          |
| `CNPJ`   | Número do CNPJ         | `12345678000190`                       |
| `RANDOM` | Chave aleatória (UUID) | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |

### Tipo de Conta

Usado ao criar transações TED (campo `accountType`):

| Valor      | Descrição      |
| ---------- | -------------- |
| `CORRENTE` | Conta corrente |
| `POUPANCA` | Conta poupança |

### Dados de Mock

A API inclui 15 transações pré-populadas com vários tipos, status e moedas para fins de teste.

## Códigos de Status de Resposta

- `200 OK` - Requisição GET bem-sucedida
- `201 Created` - Requisição POST bem-sucedida
- `400 Bad Request` - Erro de validação
- `500 Internal Server Error` - Erro do servidor

## 📤 Submissão

1. ✅ Crie um fork do repositório
2. ✅ Dê permissão de leitura para o usuário que indicarmos no repositório privado
3. ✅ No README, inclua:
   - Instruções de instalação
   - Como rodar o projeto
   - Como rodar os testes
   - Principais decisões técnicas
   - Tempo aproximado de desenvolvimento
   - Melhorias futuras (se tiver)




-------------------------------------------------------------------------------

Apos ler e entender o readme, voce deve criar um projeto seguindo as instrucoes do readme porem seguindo meu code style, a ideia eh olharem o codigo e primeiro entenderem o codigo que foi feito facilmente visualizando que podemos melhorar e que sabemos o codigo e como melhorar nossa produtividade com IA.

Comentarios devem ser em portugues com teor explicativo por que foi feito aquilo porem so nas partes onde decisoes tecnicas foram tomadas.

Voce deve seguir padroes de codigo limpo como DRY e principalmente KISS (Keep It Simple, Stupid), Single Responsibility, Custom Hooks, Type Safety, Validacoes, Error Handling, etc.

Pegue as telas no figma em: https://www.figma.com/design/YXzBTEwElRuxRVssHg465f/Teste-t%C3%A9cnico?node-id=0-1&m=dev&t=0krnC3qtatApObzH-1

Componentes devem ter no maximo 200-300 linhas, obviamente podendo exceder se precisar

Design tokens serao dentro do pacote de ui

Somente ui components devem ser do package, o que for one time devem estar na pasta web/components. Colocar no readme decisoes para migrar ou nao para o package ui, seja simples.

Gostamos de constants, para nao nos repetirmos (DRY)

Priorizamos a criação de skeletons e o bloco principal dele vai estar no pacote de ui

Componente ui Stepper do formulario deve receber se eh first/last e active para conseguirmos montarmos nosso cenario atual.

Para mascaras utilizar algo que funcione bem com ZOD e react-hook-form

Estamos usando turborepo criado agora, o package ui nao segue nossos padroes entao primeiramente devemos criar os componentes de ui e apagar todos existentes que vem com a instalacao.

Crie os services e estruture o react query. A ideia eh o front usar hooks para consumir o react query e estruturarmos os fetchers tipo services, sem frescutas o fetcher raiz ja resolve, porem deveriamos criar um wrapper apiCall que envolva o fetcher raiz para que possamos passar os headers e o base url fazer abstracoes (como base headers etc).

Botao para abrir modal deve estar no canto superior direito de transactions list com o background #00F2B1

Lembre-se dos requisitos de mobile

Ver se conseguimos utilizar feature flags e habilitar isso via process-env por enquanto, adicionar isso no README e como futuras melhorias entender que podemos utilizar outras ferramentas para isso e dar exemplos.

Adicionar nova transacao deve abrir uma modal de tela inteira.

Foque nos diferenciais

Error handling para apiCall deve ser mostrava via react-toastify

Vamos configurar todos Providers diretamente no layout

Somos diferentoes vamos ter um botao de mudar idioma e dark mode no sidebar.

Para icones vamos usar alguma lib hype de icones para o react e sempre implementalas ao inves de pure svg.

Todo mundo sabe que usamos IA para codar, entao legal gere um readme de rules contando com boas praticas e nossa estrutura para o claude e outros IA entendetem nosso sistema e trabalhar melhor com os prompts.

Somos pixel perfect, utilize a imagem do figma, caso nao consiga extrair as imagens do link do figma utilizar as imagens em anexo, a primeira eh completa, a segunda eh com o filtro date aberto e a terceira eh com os metodos multiselect, a quarta e quinta mostram o formulario de adicionar transacao.

Vamos implementar o i18n simples, utilizamos o i18next e criamos um context LanguageProvider que ficara em PRoviders e injetamos as traducoes, nos arquivos vamos utilizar o useTranslation que retorna t('translateKey'), devemos exportar um setLanguage que muda a traducao globalmente.

No final criar um app com storybook para carregar o package de ui e seus componentes.

Escreva uma rota de testes unitarios usando jest e testing library e vamos implementar depois