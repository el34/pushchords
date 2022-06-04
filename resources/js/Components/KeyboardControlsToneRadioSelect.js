import React, { useState, useEffect } from "react";
import { useScaleContext } from "@/Context/ScalesContext";
import { RadioGroup } from "@headlessui/react";

const tones = ["c", "d", "e", "f", "g", "a", "b"];

export default function KeyboardControlsToneRadioSelect(props) {
    const { scales, setScales } = useScaleContext();
    const [selected, setSelected] = useState(tones[0]);
    const [halfTone, setHalfTone] = useState(false);

    useEffect(() => {
        let selectedTone = halfTone ? `${selected}#4` : `${selected}4`;
        props.handleRadioToneChange(scales.currentScaleType, selectedTone);
    }, [selected, halfTone]);

    function handleAugmentedOrDiminishedButtonClick() {
        halfTone ? setHalfTone(false) : setHalfTone(true);
    }

    return (
        <div className="w-72 flex">
            <RadioGroup value={selected} onChange={setSelected}>
                <div className="flex">
                    <button className={`
                            mx-1 relative flex cursor-pointer rounded-md w-12 h-8 shadow-md focus:outline-none text-m items-center justify-center
                            ${halfTone ?
                                'text-cyan-300 bg-cyan-900' : 'text-cyan-600 hover:bg-cyan-400 border-2 border-cyan-400'
                            }
                            `}
                            onClick={handleAugmentedOrDiminishedButtonClick}
                    >
                        <span className="font-medium uppercase">#</span>
                    </button>
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

                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
