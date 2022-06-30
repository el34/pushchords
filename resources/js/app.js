require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ScalesProvider } from '@/Context/ScalesContext';
import { PlayerProvider } from './Context/PlayerContext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        console.log(name)
        const page = import(`./Pages/${name}`)
        return page
    },
    setup({ el, App, props }) {
        return render(
            <ScalesProvider>
                <PlayerProvider>
                    <App {...props} />
                </PlayerProvider>
            </ScalesProvider>
        , el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
