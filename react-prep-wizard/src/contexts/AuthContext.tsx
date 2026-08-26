import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

type User = { id: number; email: string };

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
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

  useEffect(() => {
    let isCancelled = false;
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(r => {
        if (!r.ok) throw new Error('Invalid token');
        return r.json();
      })
      .then(data => {
        if (!isCancelled) {
          setUser(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setToken(null);
          setUser(null);
          try {
            localStorage.removeItem('token');
          } catch {}
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
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
    () => ({ user, token, login, logout, isLoading }),
    [user, token, login, logout, isLoading]
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
