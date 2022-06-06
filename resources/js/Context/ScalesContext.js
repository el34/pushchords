import React, { useState, createContext, useContext, useEffect } from 'react';
import { Note, Scale } from '@tonaljs/tonal';

export const getScales = () => {
    return Scale.names().map(scale => {return {name: scale}});
}

export const getNotes = () => {
    let chromaticC2 = Scale.get('C4 chromatic');
    let chromaticC3 = Scale.get('C5 chromatic');
    let notes = [...chromaticC2.notes, ...chromaticC3.notes];

    return notes.map((note, index) => {
        let isSemitone = note.includes('b') || note.includes('#');
        return {
            name: isSemitone ? {diminish: note, augmented: notes[index - 1].split('').join('#')} : note,
            type: isSemitone ? 'semi' : 'natural',
        }; 
    });
}

export const getScaleOnScaleChange = (selectedScale, scales, noteName = 'c4') => {
    let currentScale = Scale.get(`${noteName} ${selectedScale}`);
    console.log(currentScale);

    let newKeyboardNotes = scales.keyboardNotes.map(note => {
        return {
            ...note,
            isInScale: currentScale.notes.some(item => 
                Note.simplify(item) === Note.simplify(note.name) || 
                Note.simplify(item) === Note.simplify(note.name.augmented) || 
                Note.simplify(item) === Note.simplify(note.name.diminish)
            )
        }
    });

    return { newKeyboardNotes, scaleNotes: currentScale.notes.map(note => Note.simplify(note)) };
}

export const ScalesContext = createContext();

export const ScalesProvider = (props) => {
    let scaleTypes = getScales();
    let stateObj = {
        types: scaleTypes,
        keyboardNotes: getNotes(),
        currentScaleType: scaleTypes[0].name,
        currentToneName: 'c4'
    };

    const [scales, setScales] = useState(stateObj);

    useEffect(() => {
       console.log(scales);
    }, [scales]);

    return (
        <ScalesContext.Provider value={{scales, setScales}}>
            { props.children }
        </ScalesContext.Provider>
    )
}

export const useScaleContext = () => useContext(ScalesContext);

