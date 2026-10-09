import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_HOME } from "@/lib/permissions";

export function PlaceholderPage({ title }: { title: string }) {
  const { user } = useAuth();
  const home = user && user.role !== "admin" ? ROLE_HOME[user.role] : "/login";

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <p className="text-sm text-muted">Conteúdo em construção.</p>
      <Link
        to={home}
        className="rounded-lg border border-cardBorder px-4 py-2 text-sm text-white hover:bg-white/5"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
