import React from 'react';
import { Routes, Route } from 'react-router';
import type { RouteRecordRaw } from '@/shared/types/Router';

// Layouts
import LayoutDefault from '@/layouts/layout-default';
import LayoutEmpty from '@/layouts/layout-empty';

// Pages
import Index from '@/pages/index';
import { Login } from '@/pages/login';
import { Autonomous } from '@/pages/autonomous';

// Guards
import { ProtectedRoute, PublicRoute } from '@/app/router/ProtectedRoute';

import { ROUTES } from '@/app/router/config';

const routes: RouteRecordRaw[] = [
    {
        element: <LayoutDefault />,
        children: [
            {
                path:    '/',
                name:    ROUTES.INDEX,
                element: (
                    <ProtectedRoute>
                        <Index />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        element: <LayoutEmpty />,
        children: [
            {
                path:    '/login',
                name:    ROUTES.LOGIN,
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path:    '/autonomous',
                name:    ROUTES.AUTONOMOUS,
                element: <Autonomous />,
            },
        ],
    },
];

/**
 * Роутер по приложению.
 */
const Router: React.FC = () => {
    return (
        <Routes>
            {routes.map((route, idx) => (
                <Route
                    key={idx}
                    element={route.element}
                >
                    {route.children?.map((item) => (
                        <Route
                            key={item.name}
                            path={item.path}
                            element={item.element}
                        />
                    ))}
                </Route>
            ))}
        </Routes>
    );
};

export default Router;
