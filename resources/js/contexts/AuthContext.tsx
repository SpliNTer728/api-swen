import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

const TOKEN_KEY = 'auth_token';

type AuthContextType = {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem(TOKEN_KEY),
    );

    const login = useCallback((newToken: string) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
    }, []);

    const logout = useCallback(async () => {
        if (token) {
            try {
                await fetch('/api/logout', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch {
                // ignore network errors on logout
            }
        }
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
    }, [token]);

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated: !!token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
