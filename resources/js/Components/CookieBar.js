import { React, useState } from 'react'
import { checkCookie, setCookie } from '@/Helpers/cookie'

export const CookieBar = () => {
    const [shown, setShown] = useState(false)
    const isConsentAllowed = checkCookie('consent-allowed')
    const isConsentDeclined = checkCookie('consent-declined')
    function handleShowCookieBar() {
        setTimeout(() => {
            setShown(true)
        }, 4000)
    }

    function handleDeclineCookiesButtonClick() {
        setCookie("consent-declined", "cookiebar", 30)
        setShown(false)
    }

    function handleAllowCookiesButtonClick() {
        setCookie("consent-allowed", "cookiebar", 30)
        if (pushchords.appEnv === "production") {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
            });
        }
        setShown(false)
    }

    function handleInitGa() {
        if (isConsentAllowed) {
            if (pushchords.appEnv === "production") {
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted'
                });
            }
        }
    }

    if (!isConsentAllowed && !shown && !isConsentDeclined) {
        handleShowCookieBar()
    }

    handleInitGa()

    return (
        <>
            {shown ? (
                <div className="max-w-screen-lg fixed bg-white inset-x-5 p-5 bottom-6 ml-auto rounded-lg drop-shadow-2xl flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between">
                    <div className="w-full">This website uses cookies to ensure you get the best experience on our website.
                        <a href="#" className="text-indigo-600 whitespace-nowrap  hover:underline">Learn more</a>
                    </div>
                    <div className="flex gap-4 items-center flex-shrink-0">
                        <button className="text-indigo-600 focus:outline-none hover:underline" onClick={handleDeclineCookiesButtonClick}>Decline</button>
                        <button className="bg-indigo-500 px-5 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none" onClick={handleAllowCookiesButtonClick}>Allow Coockies</button>
                    </div>
                </div>
            ) : ''}
        </>
    )
}
