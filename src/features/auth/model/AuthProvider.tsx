import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Провайдер авторизации — хранит токен через Electron safeStorage (IPC)
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.ipcRenderer.invoke('token:get').then((savedToken) => {
            setToken((savedToken as string | null) ?? null);
            setIsLoading(false);
        });
    }, []);

    /**
     * Сохраняет токен через main process (safeStorage)
     * @param {string} newToken
     */
    async function login(newToken: string): Promise<void> {
        await window.ipcRenderer.invoke('token:set', newToken);
        setToken(newToken);
    }

    /**
     * Удаляет токен через main process
     */
    async function logout(): Promise<void> {
        await window.ipcRenderer.invoke('token:delete');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, isAuthenticated: !!token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Хук для доступа к контексту авторизации
 * @returns {AuthContextType}
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}
