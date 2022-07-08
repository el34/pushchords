import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { InertiaLink } from '@inertiajs/inertia-react'

export default function KeyboardNavigation() {
    const { url } = usePage()
    const isScaleUrl = url === '/scales'
    const isChordsUrl = url === '/chords'
    return (
        <>
            <div className="flex">
                <InertiaLink href="/scales"
                    className={`text-white text-center block w-36 py-4 uppercase text-sm
                        ${isScaleUrl
                            ? 'bg-indigo-700 hover:bg-indigo-700'
                            : 'bg-indigo-400 hover:bg-indigo-500'
                        }`}
                >
                    Scales
                </InertiaLink>
                <InertiaLink href="/chords"
                    className={`text-white text-center block w-36 py-4 uppercase text-sm
                        ${isChordsUrl
                            ? 'bg-indigo-700 hover:bg-indigo-700'
                            : 'bg-indigo-400 hover:bg-indigo-500'
                        }`}
                >
                    Chords
                </InertiaLink>
            </div>
        </>
    )
}
