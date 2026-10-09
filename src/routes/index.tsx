import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_HOME } from "@/lib/permissions";
import { PermissionGuard, ProtectedRoute, RoleGuard } from "./guards";
import { MainLayout } from "@/components/layout/MainLayout";
import { LoginPage } from "@/pages/LoginPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

function LoginRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated && user && user.role !== "admin") {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }
  return <LoginPage />;
}

function DashboardRedirect() {
  const { user } = useAuth();
  if (user && user.role !== "admin") return <Navigate to={ROLE_HOME[user.role]} replace />;
  return <Navigate to="/login" replace />;
}

function CatchAll() {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated && user && user.role !== "admin") {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }
  return <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route
            path="/dashboard/client"
            element={
              <RoleGuard allowed={["client"]}>
                <PlaceholderPage title="Dashboard Cliente" />
              </RoleGuard>
            }
          />
          <Route
            path="/dashboard/support"
            element={
              <RoleGuard allowed={["support"]}>
                <PlaceholderPage title="Dashboard Suporte" />
              </RoleGuard>
            }
          />
          <Route
            path="/dashboard/dev"
            element={
              <RoleGuard allowed={["dev"]}>
                <PlaceholderPage title="Dashboard Desenvolvedor" />
              </RoleGuard>
            }
          />
          <Route
            path="/tickets/new"
            element={
              <PermissionGuard permission="tickets:create">
                <PlaceholderPage title="Novo Chamado" />
              </PermissionGuard>
            }
          />
          <Route
            path="/knowledge-base"
            element={
              <PermissionGuard permission="kb:view">
                <PlaceholderPage title="Base de Conhecimento" />
              </PermissionGuard>
            }
          />
          <Route path="/notifications" element={<PlaceholderPage title="Notificações" />} />
          <Route
            path="/chat"
            element={
              <PermissionGuard permission="chat:use">
                <PlaceholderPage title="Chat" />
              </PermissionGuard>
            }
          />
          <Route
            path="/clients"
            element={
              <PermissionGuard permission="tickets:view_all">
                <PlaceholderPage title="Clientes" />
              </PermissionGuard>
            }
          />
          <Route
            path="/reports"
            element={
              <PermissionGuard permission="reports:view">
                <PlaceholderPage title="Relatórios" />
              </PermissionGuard>
            }
          />
          <Route path="/settings" element={<PlaceholderPage title="Configurações" />} />
        </Route>
      </Route>

      <Route path="*" element={<CatchAll />} />
    </Routes>
  );
}
