import React from 'react';
import { Outlet } from 'react-router';

import s from './layout-empty.module.scss';

const LayoutEmpty: React.FC = () => {
    return (
        <div className={s.layoutEmpty}>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutEmpty;
