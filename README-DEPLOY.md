# Criafy — Guia de Deploy da versão com Auth

Esta versão introduz **autenticação completa** (cadastro, login, recuperação de senha), **banco de dados** (Postgres), **integração Applyfy** e **paywall real por assinatura**.

## Pré-requisitos

Você já deve ter:

- ✅ Conta Vercel com o projeto criafy conectado
- ✅ Banco Neon criado (Postgres)
- ✅ Conta Resend (envio de email)
- ✅ Banco Upstash Redis (rate limit)
- ✅ Credencial API Applyfy criada
- ✅ 8 variáveis de ambiente configuradas na Vercel

## Variáveis de ambiente necessárias

| Nome | Descrição |
|---|---|
| `DATABASE_URL` | Connection string do Neon (pooled) |
| `RESEND_API_KEY` | Chave da API Resend (`re_...`) |
| `UPSTASH_REDIS_REST_URL` | URL do Upstash Redis |
| `UPSTASH_REDIS_REST_TOKEN` | Token do Upstash Redis |
| `APPLYFY_API_KEY` | Chave da API Applyfy |
| `APPLYFY_API_BASE` | (opcional) URL base da API Applyfy — padrão `https://api.applyfy.com.br` |
| `NEXTAUTH_SECRET` | Segredo aleatório pra assinar sessões |
| `NEXTAUTH_URL` | URL pública do site (ex: `https://criafy.site`) |
| `ADMIN_EMAIL` | Email do administrador inicial |

## Rodar a migration do banco (primeira vez)

Depois de subir o código pra Vercel, é preciso criar as tabelas no Neon. Faça UMA vez:

### Opção 1 — Com Vercel CLI (recomendado)

```bash
npm i -g vercel
vercel link
vercel env pull .env.local
npx prisma migrate deploy
```

### Opção 2 — Direto no seu computador

1. Copia o valor de `DATABASE_URL` do painel Neon
2. Cria `.env.local` na raiz do projeto com:
   ```
   DATABASE_URL="postgresql://..."
   ```
3. Roda:
   ```bash
   npm install
   npx prisma migrate deploy
   ```

## Criar o admin inicial

Depois que as tabelas estiverem criadas:

```bash
npm run create:admin
```

Isso vai imprimir um email + senha temporária. **Guarde essa senha** — você vai usar pra fazer o primeiro login em `/login` como admin.

Recomendo trocar a senha logo em seguida por uma sua.

## Aplicar mudanças no GitHub

Você tem 2 caminhos:

**Caminho A — Zip completo:** deleta o repo atual e sobe o zip novo (arrasta o conteúdo).

**Caminho B — Substituir os arquivos alterados** um por um. São muitos arquivos nesta versão, o caminho A é mais rápido.

## Testando o fluxo completo

1. Acessa `/` → deve mostrar tela inicial nova (fundo escuro com gradiente)
2. Clica em "Criar minha conta" → preenche e cria
3. É levada pra `/planos`
4. Escolhe um plano → vai pro checkout Applyfy
5. Completa o pagamento
6. É redirecionada pra `/pagamento-realizado`
7. Se a API Applyfy tiver documentação correta configurada, o sistema confirma o pagamento e libera acesso
8. `/dashboard` fica desbloqueado

## Ainda pendente

- **API Applyfy — endpoint real**: o arquivo `lib/applyfy.ts` tem um endpoint placeholder. Você precisa me mandar a doc oficial da API Applyfy pra eu ajustar 5 linhas
- **Painel admin (`/admin`)**: vem na Parte 2 (próxima entrega)
- **Domínio custom**: quando conectar `criafy.site` na Vercel, atualiza `NEXTAUTH_URL`

## Deploy na Vercel

Cada push pra branch `main` dispara redeploy automático. Após o primeiro deploy com essa versão, monitore:

1. Build deve completar sem erro
2. Variáveis de ambiente carregadas
3. Migration executada

Se der erro no build, provavelmente é uma dependência faltando — rode `npm install` local antes de commitar.

---

Qualquer erro, cola o log aqui que eu ajusto.
