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

export const handleToneDispose = (selector) => {
    selector && selector.dispose();
}

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

    function handleStopPlayer(selectors) {
        Tone.Transport.stop();
        selectors.forEach(selector => {
            handleToneDispose(selector);
        });
        setPlayer({...player, isPlaying: false});

        if (player.type === 'scale') {
            setTimeout(() => {
                setPlayedNote({name: false});
            }, 1000);
        } else {
            setPlayedNote({name: false});
        }

        playingRef.current = false;

        pattern = null; chordEvent = null;
    }

    function handlePlayScale() {
        pattern = new Tone.Pattern((time, note) => {
            sampler.triggerAttackRelease(note, 0.7, time);
            setPlayedNote({name: note});

            if (note === scales.scaleNotes[scales.scaleNotes.length - 1]) {
                handleStopPlayer([pattern]);
                setTimeout(() => {
                    setPlayedNote({name: false});
                }, time + 1000);
            }
        }, scales.scaleNotes, "up");
        Tone.Transport.start();
        pattern.start(0);
    }

    function handlePlayChord() {
        chordEvent = new Tone.ToneEvent(((time, chord) => {
            setPlayedNote({name: chord});
            sampler.triggerAttackRelease(chord, 1.5, time);
            setTimeout(() => {
                handleStopPlayer([chordEvent]);
                setPlayedNote({name: false});
            }, 1500);
        }), chords.chordNotes);
        Tone.Transport.start();
        chordEvent.start();
    }

    useEffect(() => {
        if(mountRef.current) {
            Tone.start();
            if (playingRef.current) {
                if (!player.isPlaying) {
                    handleStopPlayer([pattern, chordEvent])
                }
            } else if (!playingRef.current && player.isPlaying) {
                playingRef.current = true;
                player.type === 'scale' ? handlePlayScale() : handlePlayChord();
            }
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
