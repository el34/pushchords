import { React, useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import KeyboardControls from '@/Components/KeyboardControls';
import Keyboard from '@/Components/Keyboard';
import { Interval, Note, Scale, ScaleType } from '@tonaljs/tonal';

let scalesInit, notesInit;

function getScales() {
    console.log(ScaleType.all())
    return Scale.names().map(scale => {return {name: scale}});

};

function setScale() {

}

function setNotes() {
    let chromaticC2 = Scale.get('C4 chromatic');
    let chromaticC3 = Scale.get('C5 chromatic');
    let notes = [...chromaticC2.notes, ...chromaticC3.notes];
    return notes.map((note) => {
        return {
            note: note,
            type:
                note.includes('b') || note.includes('#')
                    ? 'semi'
                    : 'natural',
        };
    });
};

notesInit = setNotes();
scalesInit = getScales();

export default function Welcome(props) {
    const [notes, setNotes] = useState(notesInit);
    const [scales, setScales] = useState(scalesInit);

    console.log(notes)

    function handleScaleChange(scale) {
        let selectedScale = Scale.get(`c4 ${scale.name}`);
    
        let notesArr = notes.map(note => {
            return {
                ...note,
                isActive: selectedScale.notes.some(item => item === note.note)
            }
        });

        setNotes(notesArr);
        console.log(notes);
        console.log(scale);
        console.log(selectedScale);
    }

    return (
        <Guest>
            <Head title="Home" />
            <div>
                <KeyboardControls scales={scales} handleScaleChange={handleScaleChange}/>
                <Keyboard notes={notes}/>
            </div>
        </Guest>
    );
}

