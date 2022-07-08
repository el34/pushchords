import React, { useState, useEffect, useRef } from "react";
import { useScaleContext } from "@/Context/ScalesContext";
import { RadioGroup } from "@headlessui/react";
import { usePlayerContext } from "@/Context/PlayerContext";
import { useChordsContext } from "@/Context/ChordsContext";
import { usePage } from "@inertiajs/inertia-react";

const tones = ["c", "d", "e", "f", "g", "a", "b"];

export default function KeyboardControlsToneRadioSelect(props) {
    const { url } = usePage();
    const initRef = useRef(false);
    const { scales } = useScaleContext();
    const { chords } = useChordsContext();
    const {player, setPlayer} = usePlayerContext();
    const [selected, setSelected] = useState(url === '/scales' ? scales.currentToneName.charAt(0) : chords.currentToneName.charAt(0));
    const [halfTone, setHalfTone] = useState(url === '/scales' ? scales.currentToneName.includes('#') : chords.currentToneName.includes('#'));

    useEffect(() => {
        if (initRef.current) {
            let selectedTone = halfTone ? `${selected}#4` : `${selected}4`;
            url === '/scales'
                ? props.handleRadioToneChange(scales.currentScaleType, selectedTone)
                : props.handleRadioToneChordsChange(chords.currentChordType, selectedTone)
            setPlayer({...player, isPlaying: false})
        }
        initRef.current = true;
    }, [selected, halfTone]);

    function handleAugmentedOrDiminishedButtonClick() {
        halfTone ? setHalfTone(false) : setHalfTone(true);
    }

    return (
        <div className="flex mb-2 lg:mb-0">
            <RadioGroup value={selected} onChange={setSelected}>
                <div className="flex">
                    <button className={`
                            mr-1 relative flex cursor-pointer rounded-md w-8 h-6 lg:w-12 lg:h-8 shadow-md focus:outline-none text-m items-center justify-center
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
                                } relative flex cursor-pointer rounded-md w-8 h-6 lg:w-10 lg:h-8 shadow-md focus:outline-none`
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
