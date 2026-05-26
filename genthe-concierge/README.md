# Genthe — Questionário Concierge / Comercial

## Estrutura do projeto

```
genthe-concierge/
├── index.html             → Questionário público (candidatos)
├── admin.html             → Painel administrativo (Genthe)
├── vercel.json            → Configuração do Vercel
├── supabase_setup.sql     → SQL para criar a tabela no Supabase
└── api/
    ├── submit.js          → Recebe e salva as respostas
    └── respostas.js       → API do painel admin (listar e atualizar)
```

---

## PASSO 1 — Supabase (banco de dados)

1. Acesse https://supabase.com e crie um projeto
2. Vá em **SQL Editor** e execute o conteúdo de `supabase_setup.sql`
3. Anote as credenciais em **Project Settings → API**:
   - `Project URL` → SUPABASE_URL
   - `anon public` → SUPABASE_ANON_KEY
   - `service_role` → SUPABASE_SERVICE_KEY

---

## PASSO 2 — Vercel (deploy)

1. Acesse https://vercel.com e faça login
2. Clique em **Add New Project → Upload** e suba o arquivo `.zip`
3. Em **Environment Variables**, adicione as 4 variáveis:

| Variável             | Valor                          |
|----------------------|--------------------------------|
| SUPABASE_URL         | https://SEU_ID.supabase.co     |
| SUPABASE_SERVICE_KEY | sua service_role key           |
| SUPABASE_ANON_KEY    | sua anon key                   |
| ADMIN_PASSWORD       | senha que você escolher        |

4. Clique em **Deploy**

---

## Acessos após o deploy

| Página       | URL                                      |
|--------------|------------------------------------------|
| Questionário | https://seu-projeto.vercel.app/          |
| Painel Admin | https://seu-projeto.vercel.app/admin     |

---

## Painel Admin

- Acesse `/admin` e insira a senha configurada em `ADMIN_PASSWORD`
- Visualize todos os candidatos em tabela
- Filtre por status: Novo / Em análise / Aprovado / Reprovado
- Busque por nome, cidade ou bairro
- Clique em qualquer linha para ver todas as respostas
- Atualize o status direto pelo modal

---

## Segurança

- O questionário público usa apenas `anon key` (somente INSERT permitido via RLS)
- O painel admin usa `service_role key` protegida por senha
- RLS habilitado no Supabase: candidatos não leem dados de outros
