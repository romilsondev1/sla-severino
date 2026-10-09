import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (!user) return null;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white/5"
      >
        <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full bg-cardBorder" />
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold text-white">{user.name}</span>
          <span className="block text-xs text-muted">{user.typeLabel}</span>
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border border-cardBorder bg-card p-1 shadow-lg">
          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 text-sm text-white hover:bg-white/5"
          >
            Configurações
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full rounded-md px-3 py-2 text-left text-sm text-white hover:bg-white/5"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
