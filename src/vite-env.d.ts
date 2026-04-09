/// <reference types="vite/client" />

interface IpcRenderer {
    on(channel: string, listener: (event: unknown, ...args: unknown[]) => void): this;
    off(channel: string, listener: (...args: unknown[]) => void): this;
    send(channel: string, ...args: unknown[]): void;
    invoke(channel: string, ...args: unknown[]): Promise<unknown>;
}

declare interface Window {
    ipcRenderer: IpcRenderer;
}

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module '*.svg?react' {
    import type { FC, SVGProps } from 'react';
    const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
