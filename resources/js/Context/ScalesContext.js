import React, { useState, createContext, useContext, useEffect } from 'react';
import { Note, Scale } from '@tonaljs/tonal';

export const getScales = () => {
    let types = Scale.names().map(scale => {return {name: scale}});
    types = types.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    types = types.sort((a, b) => a.name.toLowerCase().includes('major') ? 1 : -1);
    types = types.sort((a, b) => b.name.toLowerCase().includes('minor') ? 1 : -1);

    return types;
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

    let newKeyboardNotes = scales.keyboardNotes.map(note => {
        return {
            ...note,
            isHighlighted: currentScale.notes.some(item =>
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
    let currentScaleType = scaleTypes[17].name;

    let stateObj = {
        types: scaleTypes,
        keyboardNotes: getNotes(),
        currentScaleType: currentScaleType,
        currentToneName: 'c4',
        scaleNotes: null
    };

    let initScaleObj = getScaleOnScaleChange(currentScaleType, stateObj);

    stateObj.keyboardNotes = initScaleObj.newKeyboardNotes;
    stateObj.scaleNotes = initScaleObj.scaleNotes;

    const [scales, setScales] = useState(stateObj);

    useEffect(() => {
       //console.log(scales);
    }, [scales]);

    return (
        <ScalesContext.Provider value={{scales, setScales}}>
            { props.children }
        </ScalesContext.Provider>
    )
}

export const useScaleContext = () => useContext(ScalesContext);

