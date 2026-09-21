# Criafy v2 🚀

Ferramenta que transforma uma ideia de nicho em um infoproduto pronto para vender: **produto, grupos, copies, página de vendas e ebook em PDF** — tudo em minutos.

## O que mudou na v2

Zero IA externa. Zero API. Zero custo. A geração agora acontece **100% local**, com um banco de dados rico de nichos + motor de combinatória inteligente. Você instala e roda — sem cadastro, sem chave, sem mensalidade.

## O que o Criafy faz

- **Criar Produto** — nome, promessa, estrutura de módulos, benefícios, headline, copy de vendas, FAQ e bônus
- **Achar Grupos** — 10 comunidades por nicho com plataforma, link e nível de risco de ban (baixo/médio/alto)
- **Montar Oferta** — 10 posts em ângulos diferentes (dor, curiosidade, história, prova, contraste, pergunta, lista, objeção, promessa, urgência)
- **Página de Vendas** — página profissional gerada automaticamente para cada produto
- **Ebook em PDF** — 5 capítulos por nicho, com capa, sumário e diagramação — pra você entregar como isca digital ou como o próprio produto

## Nichos incluídos no banco

O banco tem 7 nichos ricos + 1 modelo genérico que cobre qualquer outra área:

1. Emagrecimento
2. Finanças Pessoais
3. Relacionamento
4. Carreira e Renda
5. Marketing Digital
6. Espiritualidade e Autoconhecimento
7. Culinária e Confeitaria
8. Estudos e Concursos
9. Genérico (fallback pra qualquer nicho)

Cada nicho tem: dores, desejos, objeções, benefícios, módulos, headlines, subheadlines, ângulos de copy, garantias, bônus, 10 grupos reais e 5 capítulos completos de ebook. Adicionar novos nichos é só editar `lib/nichos-db.ts` seguindo o padrão.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- pdfkit (geração de PDF)
- Storage local em JSON

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

Sem `.env`, sem chave, sem cadastro em serviço nenhum.

## Deploy na Vercel

### Opção 1 — CLI

```bash
npm i -g vercel
vercel
```

Sem variáveis de ambiente pra configurar.

### Opção 2 — GitHub + Vercel Dashboard

1. Suba esse projeto pra um repo no GitHub
2. Em vercel.com, clique em **Import Project** e conecte o repo
3. Deploy — nada mais precisa

⚠️ **Aviso sobre storage na Vercel**: o storage local em JSON funciona no seu computador, mas na Vercel os arquivos são efêmeros (o disco é resetado entre deploys). Pra produção séria, troque o corpo das funções em `lib/storage.ts` por Vercel KV, Vercel Postgres, Supabase ou o que preferir. Nada mais precisa mudar no resto do código.

## Fluxo do usuário

1. Usuário abre `/dashboard`
2. Informa nicho, público, formato e preço
3. Motor gera o produto completo (`/api/criar-produto`)
4. Motor sugere 10 grupos do banco pro nicho (`/api/achar-grupos`)
5. Motor escreve 10 copies em ângulos diferentes (`/api/gerar-copy`)
6. Página de vendas disponível em `/produto/[slug]`
7. PDF do ebook em `/api/gerar-pdf?slug=[slug]`

## Estrutura

```
criafy/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/            # Wizard de criação (5 passos)
│   ├── produto/[slug]/       # Página de vendas gerada
│   └── api/
│       ├── criar-produto/    # POST — gera produto
│       ├── achar-grupos/     # POST — sugere grupos
│       ├── gerar-copy/       # POST — 10 copies
│       ├── gerar-pagina/     # POST — retorna URL
│       └── gerar-pdf/        # GET  — baixa PDF do ebook
├── lib/
│   ├── nichos-db.ts          # Banco de dados de nichos (adicione os seus!)
│   ├── generator.ts          # Motor de combinatória
│   └── storage.ts            # Storage local em JSON
└── data/                     # Produtos gerados (ignorado no git)
```

## Como adicionar um novo nicho

Abra `lib/nichos-db.ts` e adicione uma entrada ao array `NICHOS` seguindo o padrão dos existentes. Cada nicho precisa de:

- `id`, `nome`, `keywords` (pra ser encontrado pelo input do usuário)
- `formatos` (ebook, curso, etc.)
- `dores`, `desejos`, `objecoes`, `beneficios`, `modulos`
- `headlines`, `subheadlines`, `angulosCopy`, `garantias`, `bonus`
- `grupos` (10 comunidades reais do seu nicho)
- `capitulosPdf` (5 capítulos com título e parágrafos pro ebook)

Reinicie o servidor — pronto.

## Licença

MIT — use, modifique, revenda como quiser.
"# criafy" 
"# criafy" 
