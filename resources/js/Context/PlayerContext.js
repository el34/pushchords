import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { useScaleContext } from '@/Context/ScalesContext';
import * as Tone from 'tone';

let pattern;

const sampler = new Tone.Sampler({
	urls: {
		"C4": "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		"A4": "A4.mp3",
	},
	release: 1,
	baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

export const handlePlayToneOnKeyboardClick = (tone) => {
    sampler.triggerAttackRelease(tone, "8n");
}

Tone.loaded().then((response) => {
    Tone.start();
})

export const PlayerContext = createContext();

export const PlayerProvider = (props) => {
    const playingRef = useRef(false);
    const mountRef = useRef(false);
    const [player, setPlayer] = useState({isPlaying: false});
    const [playedNote, setPlayedNote] = useState({name: null});
    const {scales, setScales} = useScaleContext();

    function setPlayedNoteToState(note) {
        setPlayedNote({name: note});
    }

    function handlePlayScale() {
        if (playingRef.current) {
            Tone.Transport.stop();
            pattern.dispose()
            setTimeout(() => {
                setPlayedNote({name: null});
            }, 1000);
        }
        if (!player.isPlaying) return;
        playingRef.current = true;
            pattern = new Tone.Pattern((time, note) => {
                sampler.triggerAttackRelease(note, 0.7, time);
                console.log(note);
                setPlayedNoteToState(note);

                if (note === scales.scaleNotes[scales.scaleNotes.length - 1]) {
                    Tone.Transport.stop();
                    pattern.dispose()
                    setPlayer({isPlaying: false});
                    setTimeout(() => {
                        setPlayedNote({name: null});
                    }, time + 1000);
                    playingRef.current = false;
                }
            }, scales.scaleNotes, "up");
            Tone.Transport.start();
            pattern.start(0);
    }

    useEffect(() => {
        if(mountRef.current) {
            Tone.start();
            handlePlayScale();
        } else {
            Tone.start();
        }
        mountRef.current = true;
    }, [player]);

    return (
        <PlayerContext.Provider value={{player, setPlayer, playedNote, setPlayedNote}}>
            { props.children }
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(PlayerContext);