import { React, useState } from "react";
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';
import { getScaleOnScaleChange, useScaleContext } from '@/Context/ScalesContext';
import KeyboardControlsScaleSelect from '@/Components/KeyboardControlsScaleSelect';

export default function KeyboardControls(props) {
    const {scales, setScales} = useScaleContext();
    const [playerStatus, setPlayerStatus] = useState('paused');

    function handleScaleChange(selected) {
        let newKeyboardNotes = getScaleOnScaleChange(selected, scales);
        setScales({...scales, keyboardNotes: newKeyboardNotes});
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
                 <div className="flex">
                    <div className="col-span-4 flex justify-center items-center">
                        <a className="" onClick={handlePlayerClick}>
                            {
                                playerStatus === 'playing' 
                                    ? <PauseIcon className="h-16 w-16 text-red-400 cursor-pointer"/> 
                                    : <PlayIcon className="h-16 w-16 text-green-400 cursor-pointer"/>
                            }
                        </a>
                    </div>
                    <div className="col-span-6">
                        <KeyboardControlsScaleSelect handleScaleChange={handleScaleChange} />
                    </div>
                 </div>
             </div>
        </div>
    )
}