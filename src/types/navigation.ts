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
