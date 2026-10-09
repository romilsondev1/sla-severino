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
