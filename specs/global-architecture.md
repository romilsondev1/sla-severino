# SPEC — Fundação Arquitetural (Roles, Permissions, Layout)
**SLA Severino · v1.0 · Escopo mínimo**

> Fonte única para este passo. Se não estiver aqui, **não implemente**.  
> **Fora de escopo:** dashboards, métricas, tabelas de tickets, CommandPalette, mocks de tickets, tela de config de perfis.

**Pré-condição:** projeto React + TS + Vite + Tailwind já iniciado; tela `/login` já existe.

---

## 0. Objetivo deste passo

Preparar a aplicação para:
1. Autenticar e guardar o usuário com `role` + `permissions`
2. Proteger rotas por autenticação, role e permission
3. Renderizar **layout adaptável** (sidebar/menu) conforme a role
4. Permitir troca de perfil mock em DEV (para testar sem backend)

**Ao terminar este passo a app deve:**
- Login existente continua funcionando
- Após login → redireciona para o dashboard da role
- Acessar URL de outra role → redireciona para a home da role do usuário
- Sidebar muda itens conforme a role
- Layout base (Sidebar + Header + Outlet) envolve as rotas autenticadas
- Páginas de dashboard podem ser **placeholder simples** (`h1` + texto)

---

## 1. Decisões fechadas (não perguntar)

| Tema | Decisão |
|---|---|
| Router | `react-router-dom` v6 |
| Auth state | `AuthContext` + hook `useAuth` |
| Theme | `ThemeContext` opcional neste passo; se já existir, manter |
| Backend | Nenhum. Auth mock |
| Admin UI | Role `admin` no tipo, **sem rotas neste passo** |
| Tabelas / tickets UI | **Não criar** |
| Novas libs | Proibido (não instalar nada) |

---

## 2. Tipos (criar literal)

### `src/types/auth.ts`

```ts
export type Role = "client" | "support" | "dev" | "admin";

export type Permission =
  | "tickets:view_own"
  | "tickets:view_all"
  | "tickets:create"
  | "tickets:assign"
  | "tickets:change_status"
  | "tickets:change_priority"
  | "kb:view"
  | "kb:edit"
  | "users:manage"
  | "reports:view"
  | "jira:sync"
  | "chat:use";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  typeLabel: string;
  avatarUrl: string;
  permissions: Permission[];
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  remember: boolean;
  provider?: "local" | "google";
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  switchRole: (role: Exclude<Role, "admin">) => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (roles: Role | Role[]) => boolean;
}
```

### `src/types/navigation.ts`

```ts
import type { LucideIcon } from "lucide-react";
import type { Permission, Role } from "./auth";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  badgeKey?: "tickets" | "notifications" | "chat";
  permission?: Permission;
  children?: NavItem[];
}

export type NavigationMap = Record<Exclude<Role, "admin">, NavItem[]>;
```

---

## 3. Permissions e homes

### `src/lib/permissions.ts`

```ts
import type { Permission, Role } from "@/types/auth";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  client: ["tickets:view_own", "tickets:create", "kb:view", "chat:use"],
  support: [
    "tickets:view_all",
    "tickets:create",
    "tickets:assign",
    "tickets:change_status",
    "tickets:change_priority",
    "kb:view",
    "kb:edit",
    "chat:use",
  ],
  dev: [
    "tickets:view_all",
    "tickets:change_status",
    "kb:view",
    "reports:view",
    "jira:sync",
    "chat:use",
  ],
  admin: [
    "tickets:view_all",
    "tickets:create",
    "tickets:assign",
    "tickets:change_status",
    "tickets:change_priority",
    "kb:view",
    "kb:edit",
    "users:manage",
    "reports:view",
    "jira:sync",
    "chat:use",
  ],
};

export const ROLE_HOME: Record<Exclude<Role, "admin">, string> = {
  client: "/dashboard/client",
  support: "/dashboard/support",
  dev: "/dashboard/dev",
};

export const ROLE_DEFAULT_THEME: Record<Exclude<Role, "admin">, "light" | "dark"> = {
  client: "light",
  support: "light",
  dev: "dark",
};

export const ROLE_LABEL: Record<Role, string> = {
  client: "Cliente",
  support: "Suporte",
  dev: "Desenvolvedor",
  admin: "Administrador",
};
```

**Regra de UI:** ações condicionais usam `hasPermission(...)`.  
**Exceção:** menu da sidebar vem de `navigationByRole` (já filtrado por role).

---

## 4. Usuários mock

### `src/mocks/users.ts`

Três usuários fixos:

| id | name | email | role | typeLabel |
|---|---|---|---|---|
| `u-client` | Maria Oliveira | maria@severino.app | client | Cliente |
| `u-support` | Carlos Souza | suporte@severino.app | support | Suporte |
| `u-dev` | João Silva | joao@severino.app | dev | Desenvolvedor |

- `permissions` = `ROLE_PERMISSIONS[role]`
- `avatarUrl` = `https://api.dicebear.com/9.x/lorelei/svg?seed={FirstName}`

Aliases de login (case-insensitive), senha sempre `123456`:
- client: `maria@severino.app` | `cliente`
- support: `suporte@severino.app` | `suporte`
- dev: `joao@severino.app` | `dev`
- Google mock → client (Maria)

---

## 5. AuthContext

### `src/contexts/AuthContext.tsx` + `src/hooks/useAuth.ts`

Comportamento:
1. No mount: hidratar de `localStorage` chave `sla.session` (`{ userId, remember }`). Se `remember === false`, preferir `sessionStorage`.
2. `isLoading`: `true` até hidratar (1 tick).
3. `login(credentials)`:
   - delay 300ms
   - resolve user pelos aliases acima
   - inválido → `throw new Error("Credenciais inválidas")` (a tela de login trata a mensagem)
   - válido → set user, persist session, **não navegar aqui** (a LoginPage navega com `ROLE_HOME[role]`)
4. `logout()`: limpa storages + `user = null`. Navegação para `/login` fica no componente que chama logout **ou** no provider se já existir padrão no projeto — manter um único lugar.
5. `switchRole(role)` (só usado em DEV na Sidebar): troca para o mock da role. Não remove sessão.
6. `hasPermission(p)` → `user?.permissions.includes(p) ?? false`
7. `hasRole(r)` → aceita `Role` ou `Role[]`

Se o projeto **já tem** AuthContext simples, **evolua** em vez de duplicar.

Integração com LoginPage existente:
- No submit de sucesso: `await login(...)` depois `navigate(ROLE_HOME[user.role])`
- Não reescrever o visual do login neste passo

---

## 6. Navegação por role

### `src/lib/navigation.ts`

Ícones lucide permitidos neste passo:  
`Home`, `Ticket`, `Plus`, `BookOpen`, `Bell`, `Settings`, `MessageSquare`, `Users`, `BarChart3`, `Code2`, `ListTodo`, `ExternalLink`

```
client:
  - Início                 /dashboard/client      Home
  - Meus Tickets           /dashboard/client      Ticket     badge tickets=3
  - Novo Chamado           /tickets/new           Plus
  - Base de Conhecimento   /knowledge-base        BookOpen
  - Notificações           /notifications         Bell       badge notifications=3
  - Configurações          /settings              Settings

support:
  - Início                 /dashboard/support     Home
  - Fila de Chamados       /dashboard/support     Ticket     badge tickets=12
  - Novo Chamado           /tickets/new           Plus
  - Chat                   /chat                  MessageSquare  badge chat=4
  - Base de Conhecimento   /knowledge-base        BookOpen
  - Notificações           /notifications         Bell       badge notifications=5
  - Configurações          /settings              Settings

dev:
  - Início                 /dashboard/dev         Home
  - Tickets                /dashboard/dev         Ticket
  - Chat                   /chat                  MessageSquare  badge chat=3
  - Clientes               /clients               Users
  - Base de Conhecimento   /knowledge-base        BookOpen
  - Relatórios             /reports               BarChart3
  - Configurações          /settings              Settings
  - grupo "Desenvolvedor" (Code2), aberto por default:
      - Meus Tickets       /dashboard/dev         Ticket
      - Backlog Técnico    /dashboard/dev         ListTodo
      - Jira               /dashboard/dev         ExternalLink
```

Exportar:
```ts
export const navigationByRole: NavigationMap
export const MOCK_BADGES = {
  tickets: { client: 3, support: 12, dev: 12 },
  notifications: { client: 3, support: 5, dev: 1 },
  chat: { client: 0, support: 4, dev: 3 },
} as const
```

---

## 7. Rotas e guards

### `src/routes/guards.tsx`

| Guard | Comportamento |
|---|---|
| `ProtectedRoute` | `!isAuthenticated` → `<Navigate to="/login" replace />`. Enquanto `isLoading` → spinner full-screen (cor brand). Senão `<Outlet />` |
| `RoleGuard` | prop `allowed: Role[]`. Se role atual ∉ allowed → `<Navigate to={ROLE_HOME[user.role]} replace />` |
| `PermissionGuard` | prop `permission: Permission`. Se falhar → `<Navigate to={ROLE_HOME[user.role]} replace />` |

### `src/routes/index.tsx` (ou arquivo de rotas do projeto)

```
/login                 pública (se autenticado → ROLE_HOME)
/forgot-password       pública (manter se já existir)

<ProtectedRoute>
  <MainLayout>
    /dashboard              → Navigate ROLE_HOME
    /dashboard/client       → RoleGuard client  → PlaceholderPage "Dashboard Cliente"
    /dashboard/support      → RoleGuard support → PlaceholderPage "Dashboard Suporte"
    /dashboard/dev          → RoleGuard dev     → PlaceholderPage "Dashboard Desenvolvedor"
    /tickets/new            → PermissionGuard tickets:create → PlaceholderPage
    /knowledge-base         → PermissionGuard kb:view → PlaceholderPage
    /notifications          → PlaceholderPage
    /chat                   → PermissionGuard chat:use → PlaceholderPage
    /clients                → PermissionGuard tickets:view_all → PlaceholderPage
    /reports                → PermissionGuard reports:view → PlaceholderPage
    /settings               → PlaceholderPage
  </MainLayout>
</ProtectedRoute>

* → não autenticado /login; autenticado ROLE_HOME
```

`PlaceholderPage`: componente mínimo  
`{ title: string }` → `h1` + parágrafo “Conteúdo em construção.” + opcional botão voltar ao `ROLE_HOME`.

**Não criar** páginas de dashboard completas neste passo.

---

## 8. Layout adaptável

### Arquivos

```
src/components/layout/
  MainLayout.tsx
  Sidebar.tsx
  GlobalHeader.tsx
  UserProfile.tsx
  MobileSidebar.tsx   # drawer < lg
```

### `MainLayout`
```
div.h-screen.flex.overflow-hidden
  Sidebar          (hidden <lg, w-64)
  div.flex-1.flex.flex-col.min-w-0
    GlobalHeader
    main.flex-1.overflow-y-auto.p-6
      <Outlet />
```
- Sem RightSidebar neste passo.
- Lê só `Outlet` + `useLocation` (sem props obrigatórias).

### `Sidebar`
- Itens = `navigationByRole[user.role]`
- `NavLink` ativo com destaque visual (bg active)
- Grupo com `children`: collapsible, inicia aberto
- Badge numérico se `badgeKey` e valor > 0
- Rodapé:
  1. Indicador “Sistema online” (dot verde)
  2. **Só se `import.meta.env.DEV`:** select “Simular perfil” → `switchRole('client'|'support'|'dev')`
- Logo/nome Severino no topo (reutilize componente de marca se já existir)

### `GlobalHeader`
- Mobile: botão hamburger abre `MobileSidebar`
- Direita: `UserProfile` (nome + typeLabel + menu Sair / Configurações)
- Busca global **não implementar** neste passo (pode reservar espaço vazio ou omitir)

### `MobileSidebar`
- Overlay + painel à esquerda, mesmos itens da Sidebar
- Fecha ao navegar

### `UserProfile`
- Logout chama `logout()` e navega `/login`
- Link Configurações → `/settings`

**Breakpoints:** sidebar desktop `lg` (1024px). Abaixo = hamburger + drawer.

---

## 9. Arquivos permitidos neste passo

**Criar ou evoluir apenas:**
```
src/types/auth.ts
src/types/navigation.ts
src/lib/permissions.ts
src/lib/navigation.ts
src/mocks/users.ts
src/contexts/AuthContext.tsx
src/hooks/useAuth.ts
src/routes/guards.tsx
src/routes/index.tsx          # ou AppRoutes existente
src/components/layout/*
src/pages/PlaceholderPage.tsx # se necessário
```

**Pode ajustar pontualmente:**
- `LoginPage` (só wiring de `login` + redirect)
- `App.tsx` / `main.tsx` (providers + router)

**Não tocar:**
- Visual completo do login (cores, layout split)
- Qualquer dashboard rico
- Tabela de tickets, métricas, right sidebar, command palette

---

## 10. Definition of Done

1. Login com `cliente` / `suporte` / `dev` (senha `123456`) redireciona para o dashboard correto  
2. URL `/dashboard/dev` logado como client → volta para `/dashboard/client`  
3. Sidebar do client ≠ sidebar do dev ≠ sidebar do support  
4. Em DEV, select “Simular perfil” troca menu e home sem novo login  
5. `/reports` como client → redireciona (sem permission)  
6. Logout volta para `/login` e bloqueia rotas protegidas  
7. Mobile: menu acessível via hamburger  
8. TypeScript strict sem erros nos arquivos tocados  
9. Nenhuma lib nova instalada  

---

## 11. Ordem de implementação

1. types + permissions + users mock  
2. AuthContext + useAuth + wiring no login  
3. navigation.ts  
4. guards + árvore de rotas + PlaceholderPage  
5. MainLayout + Sidebar + GlobalHeader + UserProfile + MobileSidebar  
6. Testar os 3 perfis + switchRole DEV + mobile  

Pare ao concluir o item 6. Não avance para dashboards.

---

Fim. Qualquer omissão é intencional.
