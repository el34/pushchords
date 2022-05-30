import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import Keyboard from '@/Components/Keyboard';

export default function Welcome(props) {
    return (
        <Guest>
            <Head title="Home" />

            <Keyboard />
        </Guest>
    );
}

