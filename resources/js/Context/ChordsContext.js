import React, { useState, createContext, useContext, useEffect } from 'react';
import { Note, Chord, ChordType } from '@tonaljs/tonal';
import { getNotes } from '@/Context/ScalesContext';


export const getChordTypes = () => {
    let types = ChordType.all().filter(item => item.name !== '');
    types = types.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    return types;
}

export const getChordOnChordChange = (selectedChord, chords, noteName = 'c4') => {
    let currentChord = Chord.get(`${noteName} ${selectedChord}`);

    let newKeyboardNotes = chords.keyboardNotes.map(note => {
        return {
            ...note,
            isHighlighted: currentChord.notes.some(item =>
                Note.simplify(item) === Note.simplify(note.name) ||
                Note.simplify(item) === Note.simplify(note.name.augmented) ||
                Note.simplify(item) === Note.simplify(note.name.diminish)
            )
        }
    });

    return { newKeyboardNotes, chordNotes: currentChord.notes.map(note => Note.simplify(note)) };
}

export const ChordsContext = createContext();

export const ChordsProvider = (props) => {
    let chordTypes = getChordTypes();
    let currentChordType = chordTypes[14].name;

    let stateObj = {
        types: chordTypes,
        keyboardNotes: getNotes(),
        currentChordType: currentChordType,
        currentToneName: 'c4',
        chordNotes: null
    };

    let initChordObj = getChordOnChordChange(currentChordType, stateObj);
    stateObj.keyboardNotes = initChordObj.newKeyboardNotes;
    stateObj.chordNotes = initChordObj.chordNotes;

    const [chords, setChords] = useState(stateObj);

    useEffect(() => {
        console.log(chords);
     }, [chords]);
    return (
        <ChordsContext.Provider value={{chords, setChords}}>
            { props.children }
        </ChordsContext.Provider>
    )
}

export const useChordsContext = () => useContext(ChordsContext);
