import { ROLE_PERMISSIONS } from "@/lib/permissions";
import type { User } from "@/types/auth";

export const MOCK_USERS: User[] = [
  {
    id: "u-client",
    name: "Maria Oliveira",
    email: "maria@severino.app",
    role: "client",
    typeLabel: "Cliente",
    avatarUrl: "https://api.dicebear.com/9.x/lorelei/svg?seed=Maria",
    permissions: ROLE_PERMISSIONS.client,
  },
  {
    id: "u-support",
    name: "Carlos Souza",
    email: "suporte@severino.app",
    role: "support",
    typeLabel: "Suporte",
    avatarUrl: "https://api.dicebear.com/9.x/lorelei/svg?seed=Carlos",
    permissions: ROLE_PERMISSIONS.support,
  },
  {
    id: "u-dev",
    name: "João Silva",
    email: "joao@severino.app",
    role: "dev",
    typeLabel: "Desenvolvedor",
    avatarUrl: "https://api.dicebear.com/9.x/lorelei/svg?seed=João",
    permissions: ROLE_PERMISSIONS.dev,
  },
];

const LOGIN_ALIASES: Record<string, string> = {
  "maria@severino.app": "u-client",
  cliente: "u-client",
  "suporte@severino.app": "u-support",
  suporte: "u-support",
  "joao@severino.app": "u-dev",
  dev: "u-dev",
};

export function findUserByIdentifier(identifier: string): User | undefined {
  const id = LOGIN_ALIASES[identifier.trim().toLowerCase()];
  return MOCK_USERS.find((u) => u.id === id);
}

export function getUserById(id: string): User | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}
