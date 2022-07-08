import React, { useEffect } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import KeyboardControls from '@/Components/KeyboardControls';
import Keyboard from '@/Components/Keyboard';
import { useChordsContext } from '@/Context/ChordsContext';
import { usePlayerContext } from '@/Context/PlayerContext';
import KeyboardNavigation from '@/Components/KeyboardNavigation';

export default function Welcome(props) {
    const {chords, setchords} = useChordsContext();
    const {player, setPlayer} = usePlayerContext();

    useEffect(() => {
        setPlayer({...player, type: 'chord'})

        return () => {
            setPlayer({...player, isPlaying: false});
        };
    }, [])
    return (
        <Guest>
            <Head title="Chords" />
            <div className="w-full 2xl:w-fit">
                <KeyboardNavigation />
                <KeyboardControls scales={chords.types}/>
                <Keyboard notes={chords.keyboardNotes}/>
            </div>
        </Guest>
    );
}

