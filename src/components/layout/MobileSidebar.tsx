import { X } from "lucide-react";
import { SidebarContent } from "./Sidebar";

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-64 border-r border-cardBorder bg-card">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute right-3 top-4 text-muted hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent onNavigate={onClose} />
      </div>
    </div>
  );
}
