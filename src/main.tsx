import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from '@/app/App';

import '@/app/styles/common.scss';

/**
 * Инициализация приложения.
 */
(async () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
    );
})();

window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message);
});
