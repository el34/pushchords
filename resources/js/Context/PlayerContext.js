import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { useScaleContext } from '@/Context/ScalesContext';
import { useChordsContext } from './ChordsContext';
import * as Tone from 'tone';

let pattern, chordEvent;

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

Tone.loaded().then(() => {
    Tone.start();
})

export const PlayerContext = createContext();

export const PlayerProvider = (props) => {
    const playingRef = useRef(false);
    const mountRef = useRef(false);
    const [player, setPlayer] = useState({isPlaying: false, type: 'scale'});
    const [playedNote, setPlayedNote] = useState({name: false});
    const {scales, setScales} = useScaleContext();
    const {chords, setChords} = useChordsContext();

    function handlePlayScale() {
        if (playingRef.current) {
            Tone.Transport.stop();
            pattern && pattern.dispose()
            setTimeout(() => {
                setPlayedNote({name: false});
            }, 1000);
        }
        if (!player.isPlaying) return;
        playingRef.current = true;
        pattern = new Tone.Pattern((time, note) => {
            sampler.triggerAttackRelease(note, 0.7, time);
            setPlayedNote({name: note});

            if (note === scales.scaleNotes[scales.scaleNotes.length - 1]) {
                Tone.Transport.stop();
                pattern && pattern.dispose()
                setPlayer({...player, isPlaying: false});
                setTimeout(() => {
                    setPlayedNote({name: false});
                }, time + 1000);
                playingRef.current = false;
            }
        }, scales.scaleNotes, "up");
        Tone.Transport.start();
        pattern.start(0);
    }

    function handlePlayChord() {
        if (playingRef.current) {
            Tone.Transport.stop();
            chordEvent && chordEvent.dispose()
            setTimeout(() => {
                setPlayedNote({name: false});
            }, 1000);
        }
        if (!player.isPlaying) return;
        playingRef.current = true;
        chordEvent = new Tone.ToneEvent(((time, chord) => {
            setPlayedNote({name: chord});
            sampler.triggerAttackRelease(chord, 1.5, time);
            setTimeout(() => {
                setPlayer({...player, isPlaying: false});
                setPlayedNote({name: false});
                playingRef.current = false;
            }, 1500);
        }), chords.chordNotes);
        Tone.Transport.start();
        chordEvent.start();
    }

    useEffect(() => {
        if(mountRef.current) {
            Tone.start();
            player.type === 'scale' ? handlePlayScale() : handlePlayChord();
        }
        mountRef.current = true;
        console.log(player)
        console.log(playedNote)
    }, [player]);

    return (
        <PlayerContext.Provider value={{player, setPlayer, playedNote, setPlayedNote}}>
            { props.children }
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(PlayerContext);
