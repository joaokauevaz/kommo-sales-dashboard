## Objetivo
Migrar o app `dashboard-kommo-salesrev` (Vite + React) do GitHub para este projeto Lovable (TanStack Start + React 19 + Tailwind v4) e conectá-lo ao Supabase externo `kvrupsbmrcenihpmbdyd.supabase.co` via Lovable Cloud.

## Pré-requisitos (você)
1. Tornar `https://github.com/joaokauevaz/dashboard-kommo-salesrev` público (a URL ainda retorna 404 agora) **ou** me enviar a URL correta / um ZIP.
2. Ter em mãos:
   - **anon/publishable key** do projeto Supabase
   - **service_role key** (eu adiciono via secrets, você cola no formulário seguro)
3. Confirmar se o schema (tabelas, RLS, functions) já está criado no Supabase — em caso negativo, precisaremos rodar as migrations do repo.

## Etapas

### 1. Inspeção do repo original
- Clonar o repo assim que estiver acessível
- Mapear: rotas (react-router?), componentes, hooks, integração Supabase, variáveis de ambiente, dependências, pasta `supabase/migrations` se houver

### 2. Portar dependências
- Instalar libs equivalentes (shadcn já está; adicionar charts, date-fns, etc. conforme o repo)
- Não trazer `react-router-dom` — converter para `@tanstack/react-router`

### 3. Portar rotas
- Cada página em `src/pages/*` ou `src/routes/*` do repo original vira um arquivo em `src/routes/` deste projeto (convenção flat: `dashboard.tsx`, `leads.$id.tsx`, etc.)
- Substituir `<BrowserRouter>/<Routes>/<Route>` por arquivos de rota + `<Link to="...">` do TanStack

### 4. Portar componentes e estilos
- Copiar `src/components/**` e `src/hooks/**` adaptando imports
- Migrar tokens de cor/tema para `src/styles.css` (Tailwind v4 usa `@theme` em CSS, não `tailwind.config.js`)

### 5. Conexão Supabase via Lovable Cloud
- Ativar Lovable Cloud apontando para o projeto externo `kvrupsbmrcenihpmbdyd`
- Configurar secrets: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (+ versões `VITE_*`)
- Usar os clients gerados em `@/integrations/supabase/client` (browser) e `client.server` (admin)
- Converter qualquer chamada server-side em `createServerFn` (TanStack Start) — **não** usar Supabase Edge Functions

### 6. Auth (se o app original tem login)
- Portar fluxo para o padrão Lovable Cloud (`onAuthStateChange` + `getSession`)
- Login social Google passa pelo broker `lovable.auth.signInWithOAuth`

### 7. Validação
- Build limpo
- Smoke test das rotas principais no preview
- Verificar conexão Supabase (leitura de uma tabela existente)

## Detalhes técnicos
- **Stack alvo**: TanStack Start v1 + React 19 + Vite 7 + Tailwind v4 + shadcn (new-york)
- **Roteamento**: file-based em `src/routes/` (não usar `src/pages/`)
- **Server logic**: `createServerFn` em arquivos `*.functions.ts`
- **Secrets**: `process.env.*` apenas dentro de server functions; nunca em módulos compartilhados

## Fora de escopo
- Manter compatibilidade com a stack Vite original (estamos portando, não espelhando)
- Edge Functions Supabase (substituídas por server functions TanStack)
- Reescrever lógica de negócio — apenas portar

## Próximo passo
Confirme que o repo está acessível (teste `https://github.com/joaokauevaz/dashboard-kommo-salesrev` no navegador anônimo) e eu inicio a inspeção e migração.