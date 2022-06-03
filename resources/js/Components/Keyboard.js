import React from 'react';

export default function Keyboard(props) {
    return (
        <div className="col-span-8">
            <div className="relative sm:mx-auto">
                <div className="relative mx-auto p-4 bg-white shadow-xl rounded-b-lg border-t border-slate-200">
                    <div className="flex">
                        {props.notes.map((note, index) => {
                            return (
                            note.type === 'natural'
                                ? <div key={note.name} className="h-80 w-20 pb-2 mx-1 shadow-md rounded-b-lg relative flex flex-col items-center justify-end cursor-pointer">
                                    {note.isActive && (
                                        <div className="bg-green-400 w-4 h-4 rounded-full"></div>
                                    )}
                                    <span className="text-gray-400 text-xs font-bold pt-4">{note.name}</span>
                                    {props.notes[index + 1] && props.notes[index + 1].type === 'semi' 
                                        ? <div key={props.notes[index + 1].name} className="h-40 w-16 pb-2 mx-1 shadow-md rounded-b-lg absolute z-10 top-0 -right-10 bg-gray-600 flex items-end justify-center cursor-pointer">
                                            <span className="text-white text-xs font-bold">{props.notes[index + 1].name}</span>
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