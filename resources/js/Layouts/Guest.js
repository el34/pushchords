import { React, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import { CookieBar } from '@/Components/CookieBar';

export default function Guest({ children }) {
    //console.log('init')
    return (
        <>
            <div className="h-screen w-full bg-slate-100">
                <nav className="h-12 w-full">
                    <div className="container min-h-full px-2 mx-auto xl flex justify-start items-center">
                        <Link href="/">
                            <ApplicationLogo className="w-36 md:w-48" />
                        </Link>
                    </div>
                </nav>

                <section className="w-full h-full -mt-12">
                    <div className="container h-full px-2 mx-auto xl flex items-center justify-center">
                        {children}
                    </div>
                </section>
            </div>
            <footer className="w-full py-4 md:py-0 md:h-16 bg-slate-900">
                <div className="container min-h-full px-2 mx-auto xl flex flex-col md:flex-row justify-center md:justify-between items-center text-xs">
                    <div>
                        <p className="text-gray-400">© Puschords 2022</p>
                    </div>
                    <div className="flex flex-col md:flex-row text-center md:text-left">
                        <a href="/" className="text-gray-400 hover:underline pt-2 md:pt-0">Terms & condition</a>
                        <span className="text-gray-400 px-2 hidden md:inline-block">|</span>
                        <a href="/" className="text-gray-400 hover:underline pt-2 md:pt-0">About</a>
                        <span className="text-gray-400 px-2 hidden md:inline-block">|</span>
                        <a href="/" className="text-gray-400 hover:underline pt-2 md:pt-0">Contact</a>
                    </div>
                </div>
            </footer>
            <CookieBar />
        </>
    );
}
