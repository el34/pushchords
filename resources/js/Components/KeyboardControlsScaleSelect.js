import { React, Fragment, useState, useEffect, useRef } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import { useScaleContext } from "@/Context/ScalesContext";
import { useChordsContext } from "@/Context/ChordsContext";
import { usePage } from "@inertiajs/inertia-react";

export default function KeyboardControlsScaleSelect(props) {
    const { url } = usePage();
    const initRef = useRef(false);
    const { scales } = useScaleContext();
    const { chords } = useChordsContext();
    let initType, types;

    if (url === '/scales') {
        initType = scales.currentScaleType;
        types = scales.types;
    } else {
        initType = chords.currentChordType;
        types = chords.types;
    }

    const [selected, setSelected] = useState(initType);

    useEffect(() => {
        if (initRef.current) {
            url === '/scales'
                ? props.handleScaleChange(selected, scales.currentToneName)
                : props.handleChordChange(selected, chords.currentToneName)
        }
        initRef.current = true;
    }, [selected]);

    return (
        <div className="relative w-72 z-30">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-slate-600">
                            {url === '/scales' ? (
                                <span>Choose your scale type</span>
                            ) : (
                                <span>Choose your chord type</span>
                            )}
                        </span>
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
                            {types.map((scale, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-amber-100 text-amber-900"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={scale.name}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {scale.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
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
    );
}
