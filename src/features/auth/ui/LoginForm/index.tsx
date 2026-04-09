import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';

import LogoIcon from '@/shared/assets/icons/logo/heros-journey.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import EyeOffIcon from '@/shared/assets/icons/eye-off.svg?react';

import { useAuth } from '../../model/AuthProvider';
import { LOGIN_MUTATION } from '../../api/loginMutation';

import s from './LoginForm.module.scss';

/**
 * Форма авторизации с полями логина и пароля
 */
export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const { data } = await loginMutation({
            variables: { input: { username, password } },
        });

        const token = (data as { loginUser?: { token?: string } })?.loginUser?.token;

        if (!token) return;

        await authLogin(token);
        navigate('/');
    }

    return (
        <div className={s.wrapper}>
            <div className={s.card}>
                <div className={s.header}>
                    <div className={s.logoWrap}>
                        <LogoIcon />
                    </div>

                    <div className={s.titleGroup}>
                        <h1 className={s.title}>Вход в систему</h1>
                        <p className={s.subtitle}>Hero's Journey Controller</p>
                    </div>
                </div>

                <form className={s.form} onSubmit={handleSubmit}>
                    <div className={s.field}>
                        <label className={s.label}>Логин</label>

                        <input
                            className={s.input}
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Введите логин"
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className={s.field}>
                        <label className={s.label}>Пароль</label>

                        <div className={s.passwordWrapper}>
                            <input
                                className={s.input}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Введите пароль"
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className={s.eyeButton}
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    {error && <p className={s.error}>{error.message}</p>}

                    <button
                        type="submit"
                        className={s.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <hr className={s.divider} />

                <div className={s.footer}>
                    <Link to="/autonomous" className={s.autonomousLink}>
                        Автономный режим
                    </Link>
                </div>
            </div>
        </div>
    );
}
