import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types';

const TOKEN_KEY = 'auth_token';

type AuthContextType = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem(TOKEN_KEY),
    );
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = useCallback(async (t: string) => {
        try {
            const res = await fetch('/api/user', {
                headers: { Authorization: `Bearer ${t}` },
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        if (token && !user) {
            fetchUser(token);
        }
    }, []);

    const login = useCallback(async (newToken: string) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
        await fetchUser(newToken);
    }, [fetchUser]);

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
        setUser(null);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
