import React from 'react';
import { Outlet } from 'react-router';

import s from './layout-default.module.scss';

const LayoutDefault: React.FC = () => {
    return (
        <div className={s.layoutDefault}>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutDefault;
