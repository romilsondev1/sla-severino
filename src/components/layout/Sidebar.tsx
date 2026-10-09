import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { BrandLogo } from "@/components/login/BrandLogo";
import { MOCK_BADGES, navigationByRole } from "@/lib/navigation";
import type { NavItem } from "@/types/navigation";

function NavItemLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const { user } = useAuth();
  const badge =
    item.badgeKey && user && user.role !== "admin"
      ? MOCK_BADGES[item.badgeKey][user.role]
      : 0;

  return (
    <NavLink
      to={item.path}
      end={item.path === "/dashboard/client" || item.path === "/dashboard/support" || item.path === "/dashboard/dev"}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive ? "bg-primary/20 text-white" : "text-muted hover:bg-white/5 hover:text-white"
        }`
      }
    >
      <span className="flex items-center gap-3">
        <item.icon className="h-5 w-5" />
        {item.label}
      </span>
      {badge > 0 && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

function NavGroup({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-white"
      >
        <span className="flex items-center gap-3">
          <item.icon className="h-5 w-5" />
          {item.label}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-1 border-l border-cardBorder pl-2">
          {item.children?.map((child) => (
            <NavItemLink key={child.id} item={child} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, switchRole } = useAuth();
  if (!user || user.role === "admin") return null;

  const items = navigationByRole[user.role];

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BrandLogo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {items.map((item) =>
          item.children ? (
            <NavGroup key={item.id} item={item} onNavigate={onNavigate} />
          ) : (
            <NavItemLink key={item.id} item={item} onNavigate={onNavigate} />
          )
        )}
      </nav>

      <div className="space-y-3 border-t border-cardBorder p-4">
        <p className="flex items-center gap-2 text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-online" />
          Sistema online
        </p>
        {import.meta.env.DEV && (
          <label className="block text-xs text-muted">
            Simular perfil
            <select
              value={user.role}
              onChange={(e) => switchRole(e.target.value as "client" | "support" | "dev")}
              className="mt-1 w-full rounded-lg border border-cardBorder bg-card px-2 py-1.5 text-sm text-white"
            >
              <option value="client">Cliente</option>
              <option value="support">Suporte</option>
              <option value="dev">Desenvolvedor</option>
            </select>
          </label>
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-cardBorder bg-card lg:block">
      <SidebarContent />
    </aside>
  );
}
