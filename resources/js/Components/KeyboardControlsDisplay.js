import React from 'react';
import { useScaleContext } from "@/Context/ScalesContext";

export default function KeyboardControlsDisplay(props) {
    const { scales } = useScaleContext();
    return (
        <>
            <div className="w-full h-full rounded-lg shadow-md border-2 border-slate-200 bg-slate-50 py-2 px-6 flex flex-col justify-center justify-items-center">
                <p className="text-slate-400 text-xs font-semibold">Selected Scale:</p>
                <p className="text-slate-600 text-l pt-1"><span className="font-semibold">{scales.currentToneName.toUpperCase()}</span> <span className="font-normal"></span>{scales.currentScaleType}</p>
            </div>
        </>
    )
};