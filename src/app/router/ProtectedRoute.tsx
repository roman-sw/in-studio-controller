import { Navigate } from 'react-router';
import type { ReactNode } from 'react';

import { useAuth } from '@/features/auth';

interface RouteGuardProps {
    children: ReactNode;
}

/**
 * Защищённый роут — редиректит на /login если нет токена.
 * Ждёт инициализации AuthProvider перед редиректом.
 */
export function ProtectedRoute({ children }: RouteGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <>{children}</>;
}

/**
 * Публичный роут — редиректит на / если уже авторизован.
 * Ждёт инициализации AuthProvider перед редиректом.
 */
export function PublicRoute({ children }: RouteGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;
    if (isAuthenticated) return <Navigate to="/" replace />;

    return <>{children}</>;
}
