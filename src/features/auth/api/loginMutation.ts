import { gql } from '@apollo/client/core';

/**
 * Мутация авторизации пользователя
 */
export const LOGIN_MUTATION = gql`
    mutation login($input: LoginUserInput) {
        loginUser(input: $input) {
            token
        }
    }
`;
