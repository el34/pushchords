require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ScalesProvider } from '@/Context/ScalesContext';
import { PlayerProvider } from './Context/PlayerContext';
import { ChordsProvider } from './Context/ChordsContext';

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
                <ChordsProvider>
                    <PlayerProvider>
                        <App {...props} />
                    </PlayerProvider>
                </ChordsProvider>
            </ScalesProvider>
        , el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
