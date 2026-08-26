import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { request, ApiError } from '../lib/apiError';

type User = { id: number; email: string };

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
  /** Non-null when the session could not be verified for a reason that is not
   *  a rejected token — the server being unreachable, for instance. */
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  /** Set when the token is probably still good but the API could not confirm it. */
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    let isCancelled = false;
    setAuthError(null);

    request<User>('/api/auth/me')
      .then((data) => {
        if (isCancelled) return;
        setUser(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (isCancelled) return;
        setIsLoading(false);

        // Only the server rejecting the token means the token is bad. Treating
        // every failure as "invalid token" signed the user out whenever the API
        // restarted, was mid-deploy, or the laptop lost wifi — and discarded a
        // perfectly good session in the process.
        const rejected = err instanceof ApiError && (err.status === 401 || err.status === 403);
        if (rejected) {
          setToken(null);
          setUser(null);
          try {
            localStorage.removeItem('token');
          } catch {}
          return;
        }
        setAuthError(err instanceof ApiError ? err.message : 'Could not reach the server.');
      });

    return () => {
      isCancelled = true;
    };
  }, [token]);

  const login = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem('token', newToken);
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('token');
    } catch {}
  }, []);

  const authValue = useMemo(
    () => ({ user, token, login, logout, isLoading, authError }),
    [user, token, login, logout, isLoading, authError]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
