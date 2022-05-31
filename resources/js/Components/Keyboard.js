import React from 'react';
import { Interval, Note, Scale } from '@tonaljs/tonal';

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

class Keyboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { notes: setNotes() };
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <>
                 <div className="col-span-8">
                     <div className="relative sm:mx-auto">
                         <div className="relative mx-auto p-4 bg-white shadow-xl sm:rounded-lg">
                             <div className="flex">
                                 {this.state.notes.map((note, index) => {
                                     return (
                                        note.type === 'natural'
                                            ? <div className="h-80 w-20 pb-2 mx-1 shadow-md rounded-b-lg relative flex items-end justify-center cursor-pointer">
                                                <span class="text-gray-400 text-xs font-bold">{note.note}</span>
                                                {this.state.notes[index + 1] && this.state.notes[index + 1].type === 'semi' 
                                                    ? <div className="h-40 w-16 pb-2 mx-1 shadow-md rounded-b-lg absolute z-10 top-0 -right-10 bg-gray-600 flex items-end justify-center cursor-pointer">
                                                        <span className="text-white text-xs font-bold">{this.state.notes[index + 1].note}</span>
                                                    </div> : ''
                                                
                                                }
                                            </div> : ''
                                     )
                                 })}
                             </div>    
                         </div>
                     </div>
                 </div>
            </>
         );
    }
};

export default Keyboard;