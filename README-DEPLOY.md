# Criafy — Guia de Deploy (v11)

Aplicação SaaS completa: cadastro/login, planos, painel administrativo oculto, integração Applyfy.

---

## Stack

- **Frontend/Backend:** Next.js 14 (App Router) + React 18
- **Estilo:** Tailwind CSS
- **Banco:** PostgreSQL (Neon) via Prisma 5
- **Auth:** NextAuth (Auth.js) v5 + Credentials + bcrypt
- **Email:** Resend
- **Rate limit:** Upstash Redis
- **Pagamentos:** Applyfy (checkout externo)
- **Deploy:** Vercel

---

## Variáveis de ambiente (obrigatórias)

Configure na Vercel (Settings → Environment Variables) e localmente em `.env`:

| Nome | Descrição |
|---|---|
| `DATABASE_URL` | Connection string do Neon (pooled) |
| `NEXTAUTH_SECRET` | Segredo aleatório de 32+ caracteres |
| `NEXTAUTH_URL` | URL pública do site (ex: `https://criafy.site`) |
| `ADMIN_EMAIL` | Email do administrador inicial |
| `ADMIN_INITIAL_PASSWORD` | Senha inicial forte (12+ caracteres) |
| `ADMIN_PANEL_PATH` | Caminho oculto do painel admin (ex: `/painel-x7k9p2m4q8`) |
| `RESEND_API_KEY` | Chave da API Resend |
| `UPSTASH_REDIS_REST_URL` | URL do Upstash Redis |
| `UPSTASH_REDIS_REST_TOKEN` | Token do Upstash Redis |
| `APPLYFY_API_KEY` | Chave da API Applyfy |
| `APPLYFY_API_BASE` | (opcional) Base da API Applyfy |

Veja `.env.example` pra template completo.

---

## Instalação do zero

```bash
# 1) Clone e instale
git clone https://github.com/SEU_USUARIO/criafy.git
cd criafy
npm install

# 2) Configure .env
cp .env.example .env
# Edite .env com seus valores reais

# 3) Migre o banco
npx prisma migrate deploy
# (ou "npx prisma db push" pra sync direto sem migration versionada)

# 4) Crie o admin inicial
npm run create:admin
# Sem senha impressa. Use --show-password se precisar imprimir uma vez.
```

---

## Rota do painel admin

O painel administrativo **não fica em `/admin`**. O caminho é configurado
por `ADMIN_PANEL_PATH` (env). O middleware faz o rewrite interno.

**Padrão de fallback:** `/painel-criafy-9x7` (só em dev — troque em produção).

**Comportamento:**
- `${ADMIN_PANEL_PATH}` → renderiza painel (se usuário for admin)
- `${ADMIN_PANEL_PATH}` sem role admin → 404
- `/admin` acessado direto → 404 (rota interna oculta)

---

## Deploy na Vercel

1. Push pra `main` → deploy automático
2. Verifique **Deployments → View Function Logs** se der erro
3. Antes do primeiro deploy, garanta que as 11 env vars estejam configuradas

---

## Rotas da aplicação

### Públicas
| Rota | Descrição |
|---|---|
| `/` | Landing page |
| `/login` | Login |
| `/cadastro` | Cadastro |
| `/esqueci-senha` | Solicitar recuperação de senha |
| `/redefinir-senha/[token]` | Definir nova senha |
| `/planos` | Escolha de plano (checkout Applyfy) |
| `/pagamento-realizado` | Página de aviso pós-pagamento |
| `/produto/[slug]?d=[token]` | Páginas de vendas geradas |

### Autenticadas (usuário)
| Rota | Descrição |
|---|---|
| `/dashboard` | Wizard de criação de produto |
| `/meus-produtos` | Histórico de produtos criados |
| `/conta` | Perfil + alterar senha + status do plano |

### Administrativas (rota oculta)
| Rota (interna) | Descrição |
|---|---|
| `${ADMIN_PATH}` | Dashboard com métricas |
| `${ADMIN_PATH}/usuarios` | Listagem + busca |
| `${ADMIN_PATH}/usuarios/[id]` | Detalhes + ações |
| `${ADMIN_PATH}/pagamentos` | Histórico de intenções de compra |
| `${ADMIN_PATH}/projetos` | Todos os produtos criados |

---

## Integração Applyfy — Estado atual

⚠️ **Limitação conhecida:** a documentação oficial da API Applyfy
(`https://app.applyfy.com.br/docs/v1`) exige login, então o endpoint
implementado em `lib/applyfy.ts` (`GET /v1/transactions?email=...`) é
uma suposição baseada em padrão de mercado.

**Enquanto os endpoints reais não forem confirmados:**
- `/api/verificar-pagamento` retorna sempre `payment_pending`
- A liberação de acesso é feita **manualmente pelo admin** em
  `${ADMIN_PATH}/usuarios/[id]` (botões "Liberar mensal" / "Liberar vitalício")

Assim que a documentação for confirmada, ajuste as constantes em
`lib/applyfy.ts` (URL base, path de listagem, campos do JSON).

---

## Segurança

- Senhas com bcrypt (12 rounds)
- Cookies HttpOnly + Secure em produção (padrão do NextAuth)
- Rate limit no signup (3/h), login (5/15m), recuperação (3/h)
- Rota admin oculta (`ADMIN_PANEL_PATH`)
- Middleware bloqueia `/admin` direto (404) e força role admin
- Autorização validada no backend (não confia no frontend)
- Auditoria de todas as ações admin (`AuditLog`)
- Headers HTTP de segurança (CSP, HSTS, X-Frame-Options, etc.)

---

## Limitações conhecidas

1. **API Applyfy** — endpoint suposto, precisa confirmação da doc oficial
2. **Sem cron pra expirar mensais** — hoje a expiração é registrada no banco
   mas não muda status automaticamente ao vencer. Implementar cron ou
   verificar em cada login.
3. **Sem envio de email de boas-vindas com verificação** — email é opcional
4. **Sem testes automatizados** — deixado pra próxima iteração
5. **Sem webhook Applyfy** — depende da API deles ter esse recurso

---

## Suporte

WhatsApp: `+55 61 92004-9241`
Site: https://criafy.site
