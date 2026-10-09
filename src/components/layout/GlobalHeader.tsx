import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";
import { UserProfile } from "./UserProfile";

export function GlobalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between border-b border-cardBorder bg-card px-4 py-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden lg:block" />
        <UserProfile />
      </header>
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
