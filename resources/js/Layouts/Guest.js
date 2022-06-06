import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <>
            <div className="h-screen w-full bg-slate-100">
                <nav className="h-12 w-full">
                    <div className="container min-h-full px-2 mx-auto xl flex justify-start items-center">
                        <Link href="/">
                            <ApplicationLogo className="fill-current w-48" />
                        </Link>
                    </div>
                </nav>

                <section className="w-full h-full -mt-12">
                    <div className="container h-full px-2 mx-auto xl flex items-center justify-center">
                        {children}
                    </div>
                </section>
            </div>
            <footer className="w-full h-16 bg-slate-900">
                <div className="container min-h-full px-2 mx-auto xl flex justify-between items-center text-xs">
                    <div>
                        <p className="text-gray-400">© Puschords 2022</p>
                    </div>
                    <div>
                        <a href="/" className="text-gray-400 hover:underline">Terms & condition</a>
                        <span className="text-gray-400 px-2">|</span>
                        <a href="/" className="text-gray-400 hover:underline">About</a>
                        <span className="text-gray-400 px-2">|</span>
                        <a href="/" className="text-gray-400 hover:underline">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
