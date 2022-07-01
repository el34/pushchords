import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import KeyboardNavigation from '@/Components/KeyboardNavigation';
import KeyboardControls from '@/Components/KeyboardControls';
import Keyboard from '@/Components/Keyboard';
import { useScaleContext } from '@/Context/ScalesContext';

export default function Welcome(props) {
    const {scales, setScales} = useScaleContext();

    return (
        <Guest>
            <Head title="Scales" />
            <div>
                <KeyboardNavigation />
                <KeyboardControls scales={scales.types}/>
                <Keyboard notes={scales.keyboardNotes}/>
            </div>
        </Guest>
    );
}

