import React, { useState, createContext, useContext } from 'react';
import { Scale } from '@tonaljs/tonal';

export const getScales = () => {
    return Scale.names().map(scale => {return {name: scale}});

}

export const getNotes = () => {
    let chromaticC2 = Scale.get('C4 chromatic');
    let chromaticC3 = Scale.get('C5 chromatic');
    let notes = [...chromaticC2.notes, ...chromaticC3.notes];
    return notes.map((note) => {
        return {
            name: note,
            type:
                note.includes('b') || note.includes('#')
                    ? 'semi'
                    : 'natural',
        };
    });
}

export const getScaleOnScaleChange = (selectedScale, scales, noteName = 'c4') => {
    console.log(scales)
    let currentScale = Scale.get(`${noteName} ${selectedScale}`);

    let newKeyboardNotes = scales.keyboardNotes.map(note => {
        return {
            ...note,
            isActive: currentScale.notes.some(item => item === note.name)
        }
    });

    return newKeyboardNotes;
}

export const ScalesContext = createContext();

export const ScalesProvider = (props) => {
    let stateObj = {
        types: getScales(),
        keyboardNotes: getNotes()
    };

    const [scales, setScales] = useState(stateObj);

    return (
        <ScalesContext.Provider value={{scales, setScales}}>
            { props.children }
        </ScalesContext.Provider>
    )
}

export const useScaleContext = () => useContext(ScalesContext);

