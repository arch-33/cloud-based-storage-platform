import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import { ConfirmProvider } from 'react-confirm-hook';
const appName = import.meta.env.VITE_APP_NAME || '';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <NextUIProvider>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem={true}
                        storageKey='ui-theme'
                    >
                        <ConfirmProvider>
                            <App {...props} />
                        </ConfirmProvider>
                        <Toaster />
                    </NextThemesProvider>
                </NextUIProvider>
            </StrictMode>
        );
    },
    progress: {
        color: '#7dff7d',
    },
});
