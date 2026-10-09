import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_HOME } from "@/lib/permissions";
import type { Permission, Role } from "@/types/auth";

function FullScreenSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-bgRight">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <FullScreenSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

export function RoleGuard({ allowed, children }: { allowed: Role[]; children?: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <FullScreenSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role)) {
    const home = user.role === "admin" ? "/login" : ROLE_HOME[user.role];
    return <Navigate to={home} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
}

export function PermissionGuard({ permission, children }: { permission: Permission; children?: ReactNode }) {
  const { user, isLoading, hasPermission } = useAuth();

  if (isLoading) return <FullScreenSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (!hasPermission(permission)) {
    const home = user.role === "admin" ? "/login" : ROLE_HOME[user.role];
    return <Navigate to={home} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
}
