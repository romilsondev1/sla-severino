import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { findUserByIdentifier, getUserById, MOCK_USERS } from "@/mocks/users";
import type {
  AuthContextValue,
  LoginCredentials,
  Permission,
  Role,
  User,
} from "@/types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "sla.session";

interface SessionPayload {
  userId: string;
  remember: boolean;
}

function readSession(): SessionPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionPayload;
  } catch {
    return null;
  }
}

function persistSession(payload: SessionPayload) {
  const raw = JSON.stringify(payload);
  if (payload.remember) {
    localStorage.setItem(STORAGE_KEY, raw);
    sessionStorage.removeItem(STORAGE_KEY);
  } else {
    sessionStorage.setItem(STORAGE_KEY, raw);
    localStorage.removeItem(STORAGE_KEY);
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = readSession();
    if (session) {
      const found = getUserById(session.userId);
      if (found) setUser(found);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    await new Promise((r) => setTimeout(r, 300));

    if (credentials.provider === "google") {
      const googleUser = MOCK_USERS[0];
      setUser(googleUser);
      persistSession({ userId: googleUser.id, remember: credentials.remember });
      return;
    }

    const found = findUserByIdentifier(credentials.identifier);
    if (!found || credentials.password !== "123456") {
      throw new Error("Credenciais inválidas");
    }
    setUser(found);
    persistSession({ userId: found.id, remember: credentials.remember });
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const switchRole = useCallback((role: Exclude<Role, "admin">) => {
    const found = MOCK_USERS.find((u) => u.role === role);
    if (!found) return;
    setUser(found);
    const session = readSession();
    if (session) persistSession({ userId: found.id, remember: session.remember });
  }, []);

  const hasPermission = useCallback(
    (permission: Permission) => user?.permissions.includes(permission) ?? false,
    [user]
  );

  const hasRole = useCallback(
    (roles: Role | Role[]) => {
      if (!user) return false;
      return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
    },
    [user]
  );

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    switchRole,
    hasPermission,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
