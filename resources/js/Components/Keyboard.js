import React, {useRef, useEffect} from 'react';
import { usePlayerContext } from '@/Context/PlayerContext';
import { handlePlayToneOnKeyboardClick } from '@/Context/PlayerContext';

export default function Keyboard(props) {
    const {player, setPlayer} = usePlayerContext();
    const {playedNote, setPlayedNote} = usePlayerContext();

    function handleKeyClick(event, tone) {
        event.stopPropagation();
        if (player.isPlaying) return;
        handlePlayToneOnKeyboardClick(tone);
    }
    return (
        <div className="col-span-8">
            <div className="relative sm:mx-auto">
                <div className="relative mx-auto p-4 bg-white shadow-xl rounded-b-lg border-t border-slate-200">
                    <div className="flex">
                        {props.notes.map((note, index) => {
                            return (
                            note.type === 'natural'
                                ? <div key={note.name}
                                       className="h-80 w-20 pb-2 mx-1 shadow-md rounded-b-lg relative flex flex-col items-center justify-end cursor-pointer"
                                       onClick={(event) => {handleKeyClick(event, note.name)}}>
                                    {note.isInScale && (
                                        <div className={`${playedNote.name === note.name ? 'bg-red-400' : 'bg-green-400'} w-4 h-4 rounded-full`}></div>
                                    )}
                                    <span className="text-gray-400 text-xs font-bold pt-4">{note.name}</span>
                                    {props.notes[index + 1] && props.notes[index + 1].type === 'semi' 
                                        ? <div key={props.notes[index + 1].name.augmented} className="h-40 w-16 pb-2 mx-1 shadow-md rounded-b-lg absolute z-10 top-0 -right-10 bg-gray-600 flex flex-col items-center justify-end cursor-pointer" onClick={(event) => {handleKeyClick(event, props.notes[index + 1].name.augmented)}}>
                                            {props.notes[index + 1].isInScale && (
                                                <div className={`${playedNote.name === props.notes[index + 1].name.augmented 
                                                    || playedNote.name === props.notes[index + 1].name.diminish ? 'bg-red-400' : 'bg-green-400'} w-4 h-4 rounded-full`}></div>
                                            )}
                                            <span className="text-white text-xs font-bold pt-4">{props.notes[index + 1].name.augmented}</span>
                                        </div> : ''
                                    
                                    }
                                </div> : ''
                            )
                        })}
                    </div>    
                </div>
            </div>
        </div>
    );
};