import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

import { defineConfig, loadEnv } from 'vite';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/**
 * Конфигурация Eslint - https://vitejs.dev/config/
 *
 * @param {unknown} params
 * @param {string} params.mode
 */
export default ({ mode }: { mode: string }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

    return defineConfig({
        base:    '',
        plugins: [
            react(),
            svgr(),
            electron({
                main: {
                    entry: 'electron/main.ts'
                },
                preload: {
                    input: path.join(__dirname, 'electron/preload.ts'),
                },
                renderer: process.env.MODE === 'test'
                    ? undefined
                    : {},
            }),
        ],
        build: {
            minify:            'terser',
            assetsInlineLimit: 1024,
            sourcemap:         'hidden'
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/app/styles/_variables.scss" as *;                  
                        @use "@/app/styles/_mixins.scss" as *;                  
                        @use "@/app/styles/_fonts.scss" as *;                  
                    `,
                },
            },
        },
    });
};
