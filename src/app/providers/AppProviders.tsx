import type { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client/react';

import { apolloClient } from '@/shared/api';
import { AuthProvider } from '@/features/auth';

interface AppProvidersProps {
    children: ReactNode;
}

/**
 * Корневой провайдер приложения — объединяет Apollo и Auth
 */
export function AppProviders({ children }: AppProvidersProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ApolloProvider>
    );
}
