import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const TOKEN_KEY = 'token';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(TOKEN_KEY);

    return {
        headers: {
            ...headers,
            ...(token && { authorization: `Bearer ${token}` }),
        },
    };
});

/**
 * Инстанс Apollo Client с поддержкой авторизации через Bearer токен
 */
export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
