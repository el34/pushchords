import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import KeyboardControls from '@/Components/KeyboardControls';
import Keyboard from '@/Components/Keyboard';
import { useScaleContext } from '@/Context/ScalesContext';

export default function Welcome(props) {
    const {scales, setScales} = useScaleContext();

    return (
        <Guest>
            <Head title="Scales" />
            <div>
                <KeyboardControls scales={scales.types}/>
                <Keyboard notes={scales.keyboardNotes}/>
            </div>
        </Guest>
    );
}

