import { React, useState } from "react";
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';
import { getScaleOnScaleChange, useScaleContext } from '@/Context/ScalesContext';
import KeyboardControlsScaleSelect from '@/Components/KeyboardControlsScaleSelect';
import KeyboardControlsToneRadioSelect from '@/Components/KeyboardControlsToneRadioSelect';
import KeyboardControlsDisplay from "./KeyboardControlsDisplay";

export default function KeyboardControls(props) {
    const {scales, setScales} = useScaleContext();
    const [playerStatus, setPlayerStatus] = useState('paused');

    function handleScaleChange(currentScale, currentTone) {
        let newKeyboardNotes = getScaleOnScaleChange(currentScale, scales, currentTone);
        setScales({...scales, keyboardNotes: newKeyboardNotes, currentScaleType: currentScale});
    }

    function handleRadioToneChange(currentScale, currentTone) {
        let newKeyboardNotes = getScaleOnScaleChange(currentScale, scales, currentTone);
        setScales({...scales, keyboardNotes: newKeyboardNotes, currentToneName: currentTone});
    }

    const handlePlayerClick = (event) => {
        event.preventDefault();
        playerStatus === 'paused' ? setPlayerStatus('playing') : setPlayerStatus('paused');
        setTimeout(() => {
            console.log(playerStatus);
        }, 2000)
    }

    return (
        <div className="col-span-8">
             <div className="w-full h-28 p-4 bg-white shadow-xl rounded-t-lg">
                 <div className="grid grid-cols-10">
                    <div className="flex justify-start items-center">
                        <a className="" onClick={handlePlayerClick}>
                            {
                                playerStatus === 'playing' 
                                    ? <PauseIcon className="h-20 w-20 text-red-400 cursor-pointer"/> 
                                    : <PlayIcon className="h-20 w-20 text-green-400 cursor-pointer"/>
                            }
                        </a>
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-col h-full justify-between justify-items-start">
                            <KeyboardControlsToneRadioSelect handleRadioToneChange={handleRadioToneChange}/>
                            <KeyboardControlsScaleSelect handleScaleChange={handleScaleChange} />
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