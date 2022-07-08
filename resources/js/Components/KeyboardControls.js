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
        <div className="col-span-8">
             <div className="w-full h-28 p-4 bg-white shadow-xl rounded-tr-lg">
                 <div className="grid grid-cols-10">
                    <div className="flex justify-start items-center">
                        <a className="" onClick={handlePlayerClick}>
                            {
                                player.isPlaying
                                    ? <PauseIcon className="h-20 w-20 text-red-400 cursor-pointer"/>
                                    : <PlayIcon className="h-20 w-20 text-green-400 cursor-pointer"/>
                            }
                        </a>
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-col h-full justify-between justify-items-start">
                            <KeyboardControlsToneRadioSelect handleRadioToneChange={handleRadioToneChange} handleRadioToneChordsChange={handleRadioToneChordsChange}/>
                            <KeyboardControlsScaleSelect handleScaleChange={handleScaleChange} handleChordChange={handleChordChange}/>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <KeyboardControlsDisplay />
                    </div>
                    <div className="col-span-1">

                    </div>
                 </div>
             </div>
        </div>
    )
}
