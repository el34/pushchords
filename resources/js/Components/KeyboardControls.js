import React from "react";
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';
import { getScaleOnScaleChange, useScaleContext } from '@/Context/ScalesContext';
import { usePlayerContext } from '@/Context/PlayerContext';
import { getChordOnChordChange, useChordsContext } from "@/Context/ChordsContext";
import KeyboardControlsScaleSelect from '@/Components/KeyboardControlsScaleSelect';
import KeyboardControlsToneRadioSelect from '@/Components/KeyboardControlsToneRadioSelect';
import KeyboardControlsDisplay from "./KeyboardControlsDisplay";
import { usePage } from "@inertiajs/inertia-react";

export default function KeyboardControls(props) {
    const {url} = usePage();
    const {scales, setScales} = useScaleContext();
    const {chords, setChords} = useChordsContext();
    const {player, setPlayer} = usePlayerContext();

    function handleScaleChange(currentScale, currentTone) {
        let newKeyboardNotesObj = getScaleOnScaleChange(currentScale, scales, currentTone);
        setScales({
            ...scales,
            keyboardNotes: newKeyboardNotesObj.newKeyboardNotes,
            currentScaleType: currentScale,
            scaleNotes: newKeyboardNotesObj.scaleNotes
        });
    }

    function handleRadioToneChange(currentScale, currentTone) {
        let newKeyboardNotesObj = getScaleOnScaleChange(currentScale, scales, currentTone);
        setScales({
            ...scales,
            keyboardNotes: newKeyboardNotesObj.newKeyboardNotes,
            currentToneName: currentTone,
            scaleNotes: newKeyboardNotesObj.scaleNotes
        });
    }

    function handleChordChange(currentChord, currentTone) {
        let newKeyboardNotesObj = getChordOnChordChange(currentChord, chords, currentTone);
        setChords({
            ...chords,
            keyboardNotes: newKeyboardNotesObj.newKeyboardNotes,
            currentChordType: currentChord,
            chordNotes: newKeyboardNotesObj.chordNotes
        });
    }

    function handleRadioToneChordsChange(currentChord, currentTone) {
        let newKeyboardNotesObj = getChordOnChordChange(currentChord, chords, currentTone);
        setChords({
            ...chords,
            keyboardNotes: newKeyboardNotesObj.newKeyboardNotes,
            currentToneName: currentTone,
            chordNotes: newKeyboardNotesObj.chordNotes
        });
    }

    const handlePlayerClick = (event) => {
        event.preventDefault();
        let type = url === '/scales' ? 'scale' : 'chord'
        player.isPlaying ? setPlayer({isPlaying: false, type: type}) : setPlayer({isPlaying: true, type: type});
    }

    return (
        <div className="w-full lg:h-28 p-4 bg-white shadow-xl rounded-tr-lg">
            <div className="flex flex-col lg:grid lg:grid-cols-10">
                <div className="my-2 lg:my-0 flex justify-start items-center">
                    <a className="" onClick={handlePlayerClick}>
                        {
                            player.isPlaying
                                ? <PauseIcon className="w-16 h-16 lg:h-20 lg:w-20 text-red-400 cursor-pointer"/>
                                : <PlayIcon className="w-16 h-16 lg:h-20 lg:w-20 text-green-400 cursor-pointer"/>
                        }
                    </a>
                </div>
                <div className="my-2 lg:my-0 lg:col-span-4">
                    <div className="flex flex-col h-full justify-between justify-items-start">
                        <KeyboardControlsToneRadioSelect handleRadioToneChange={handleRadioToneChange} handleRadioToneChordsChange={handleRadioToneChordsChange}/>
                        <KeyboardControlsScaleSelect handleScaleChange={handleScaleChange} handleChordChange={handleChordChange}/>
                    </div>
                </div>
                <div className="my-2 lg:my-0 lg:col-span-3">
                    <KeyboardControlsDisplay />
                </div>
                <div className="lg:col-span-1">

                </div>
            </div>
        </div>
    )
}
