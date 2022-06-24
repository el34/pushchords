import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';

export default function Welcome(props) {
    console.log(props)
    return (
        <Guest>
            <Head title="Home" />
            <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-start">
                <div className="flex flex-col w-full xl:w-2/5 justify-start lg:items-start overflow-y-hidden">
                    <h1 className="my-4 text-3xl md:text-6xl text-indigo-800 font-oswald font-black uppercase leading-tight text-center md:text-left slide-in-bottom-h1">Scales & chords cheatsheet</h1>
                    <p className="leading-normal text-base md:text-xl mb-8 font-light text-center md:text-left slide-in-bottom-subtitle">Apple pie toffee lollipop chocolate lemon drops marshmallow cheesecake tootsie roll. Chupa chups cake lollipop danish apple pie muffin.</p>
                    <Link className="text-white text-center uppercase font-bold text-sm tracking-widest hover:bg-green-500 bg-green-400 rounded-sm px-8 py-2 no-underline hover:no-underline" href="/scales">
                        Try for free
                    </Link>
                </div>
                <div className="w-full xl:w-3/5 py-6 overflow-y-hidden">
                    <img className="w-full md:w-5/6 mx-auto md:ml-auto slide-in-bottom" src={`${Ziggy.url}/img/hp-keyboard.png`}></img>
                </div>
            </div>
        </Guest>
    );
}

