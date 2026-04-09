import React from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '@/features/auth';

import s from './index.module.scss';

const Index: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <div className={s.index}>
            <button className={s.logoutButton} onClick={handleLogout}>
                Выйти
            </button>
        </div>
    );
};

export default Index;
