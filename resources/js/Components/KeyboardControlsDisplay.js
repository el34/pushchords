import React from 'react';
import { useScaleContext } from "@/Context/ScalesContext";
import { useChordsContext } from '@/Context/ChordsContext';
import { usePage } from '@inertiajs/inertia-react';

export default function KeyboardControlsDisplay(props) {
    const { url } = usePage();
    const { scales } = useScaleContext();
    const { chords } = useChordsContext();
    return (
        <>
            <div className="w-full h-full rounded-lg shadow-md border-2 border-slate-200 bg-slate-50 py-2 px-6 flex flex-col justify-center justify-items-center">
                <p className="text-slate-400 text-xs font-semibold">
                    {url === '/scales' ? (
                        <span>Selected Scale:</span>
                    ) : (
                        <span>Selected Chord:</span>
                    )}
                </p>
                <p className="text-slate-600 text-l pt-1">
                    {url === '/scales' ? (
                        <>
                            <span className="font-semibold">{scales.currentToneName.toUpperCase()}</span> <span className="font-normal">{scales.currentScaleType}</span>
                        </>
                    ) : (
                        <>
                            <span className="font-semibold">{chords.currentToneName.toUpperCase()}</span> <span className="font-normal">{chords.currentChordType}</span>
                        </>
                    )}
                </p>
            </div>
        </>
    )
};
