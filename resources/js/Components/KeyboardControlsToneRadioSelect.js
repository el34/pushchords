import React, { useState, useEffect } from "react";
import { useScaleContext } from "@/Context/ScalesContext";
import { RadioGroup } from "@headlessui/react";

const tones = ["c", "d", "e", "f", "g", "a", "b"];

export default function KeyboardControlsToneRadioSelect(props) {
    const { scales, setScales } = useScaleContext();
    const [selected, setSelected] = useState(tones[0]);

    useEffect(() => {
        props.handleRadioToneChange(scales.currentScaleType, `${selected}4`);
    }, [selected]);

    return (
        <div className="w-72 flex">
            <RadioGroup value={selected} onChange={setSelected}>
                <div className="flex">
                    {tones.map((tone) => (
                        <RadioGroup.Option
                            key={tone}
                            value={tone}
                            className={({ active, checked }) =>
                                `mx-1 ${
                                    checked
                                        ? "bg-amber-300 text-amber-900"
                                        : "text-gray-900 hover:bg-amber-100 hover:text-amber-900"
                                } relative flex cursor-pointer rounded-md w-10 h-8 shadow-md focus:outline-none`
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <div className="w-full h-full">
                                        <div className="text-sm flex w-full h-full items-center justify-center">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium uppercase ${
                                                    checked
                                                        ? "text-amber-900"
                                                        : "hover:text-amber-900"
                                                }`}
                                            >
                                                {tone}
                                            </RadioGroup.Label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
