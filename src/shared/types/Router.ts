export type RouteRecordRaw = {
    path?: string;
    name?: string;
    element: React.ReactNode;
    children?: RouteRecordRaw[];
};
