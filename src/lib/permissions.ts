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
