import {
  BarChart3,
  Bell,
  BookOpen,
  Code2,
  ExternalLink,
  Home,
  ListTodo,
  MessageSquare,
  Plus,
  Settings,
  Ticket,
  Users,
} from "lucide-react";
import type { NavigationMap } from "@/types/navigation";

export const navigationByRole: NavigationMap = {
  client: [
    { id: "home", label: "Início", path: "/dashboard/client", icon: Home },
    { id: "tickets", label: "Meus Tickets", path: "/dashboard/client", icon: Ticket, badgeKey: "tickets" },
    { id: "new", label: "Novo Chamado", path: "/tickets/new", icon: Plus },
    { id: "kb", label: "Base de Conhecimento", path: "/knowledge-base", icon: BookOpen },
    { id: "notifications", label: "Notificações", path: "/notifications", icon: Bell, badgeKey: "notifications" },
    { id: "settings", label: "Configurações", path: "/settings", icon: Settings },
  ],
  support: [
    { id: "home", label: "Início", path: "/dashboard/support", icon: Home },
    { id: "queue", label: "Fila de Chamados", path: "/dashboard/support", icon: Ticket, badgeKey: "tickets" },
    { id: "new", label: "Novo Chamado", path: "/tickets/new", icon: Plus },
    { id: "chat", label: "Chat", path: "/chat", icon: MessageSquare, badgeKey: "chat" },
    { id: "kb", label: "Base de Conhecimento", path: "/knowledge-base", icon: BookOpen },
    { id: "notifications", label: "Notificações", path: "/notifications", icon: Bell, badgeKey: "notifications" },
    { id: "settings", label: "Configurações", path: "/settings", icon: Settings },
  ],
  dev: [
    { id: "home", label: "Início", path: "/dashboard/dev", icon: Home },
    { id: "tickets", label: "Tickets", path: "/dashboard/dev", icon: Ticket },
    { id: "chat", label: "Chat", path: "/chat", icon: MessageSquare, badgeKey: "chat" },
    { id: "clients", label: "Clientes", path: "/clients", icon: Users },
    { id: "kb", label: "Base de Conhecimento", path: "/knowledge-base", icon: BookOpen },
    { id: "reports", label: "Relatórios", path: "/reports", icon: BarChart3 },
    { id: "settings", label: "Configurações", path: "/settings", icon: Settings },
    {
      id: "dev-group",
      label: "Desenvolvedor",
      path: "/dashboard/dev",
      icon: Code2,
      children: [
        { id: "dev-my-tickets", label: "Meus Tickets", path: "/dashboard/dev", icon: Ticket },
        { id: "backlog", label: "Backlog Técnico", path: "/dashboard/dev", icon: ListTodo },
        { id: "jira", label: "Jira", path: "/dashboard/dev", icon: ExternalLink },
      ],
    },
  ],
};

export const MOCK_BADGES = {
  tickets: { client: 3, support: 12, dev: 12 },
  notifications: { client: 3, support: 5, dev: 1 },
  chat: { client: 0, support: 4, dev: 3 },
} as const;
