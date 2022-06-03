import { React, Fragment, useState, useEffect } from "react";
import { PlayIcon, PauseIcon, CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react';
import { getScaleOnScaleChange, useScaleContext } from '@/Context/ScalesContext';

export default function KeyboardControls(props) {
    const {scales, setScales} = useScaleContext();
    const [playerStatus, setPlayerStatus] = useState('paused');
    const [selected, setSelected] = useState(scales.types[0].name);

    function handleScaleChange(selected) {
        let newKeyboardNotes = getScaleOnScaleChange(selected, scales);
        setScales({...scales, keyboardNotes: newKeyboardNotes});
    }

    useEffect(() => {
        handleScaleChange(selected);
    }, [selected]);

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
                        <div className="relative w-72 z-30">
                            <Listbox value={selected} onChange={setSelected}>
                                <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{selected}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {scales.types.map((scale, index) => (
                                        <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={scale.name}
                                        >
                                        {({ selected }) => (
                                            <>
                                            <span
                                                className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {scale.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                            </>
                                        )}
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                                </div>
                            </Listbox>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    )
}