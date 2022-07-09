<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Music scales, chords and chords progression cheatsheet">
        <meta name="keywords" content="music, music theory, music scale, music scales, piano, keyboard, piano scales, chord, chords, chords progressions, piano chords, guitar chords, daw, ableton, synth, synthwave">

        <meta property="og:title" content="Pushchords" />
        <meta property="og:description" content="Music scales, chords and chords progression cheatsheet" />
        <meta property="og:url" content="https://pushchords.com" />
        <meta property="og:image" content="{{asset('img/og/og-image.jpg')}}" />

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="apple-touch-icon" sizes="180x180" href="{{asset('favico/apple-touch-icon.png')}}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{asset('favico/favicon-32x32.png')}}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{asset('favico/favicon-16x16.png')}}">
        <link rel="manifest" href="{{asset('favico/site.webmanifest')}}">
        <link rel="mask-icon" href="{{asset('favico/safari-pinned-tab.svg')}}" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;500&family=Oswald:wght@300;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <!-- Scripts -->
        @env ('production')
            <!-- Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-VK9P9F9NZL"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied'
                });
                gtag('js', new Date());
                gtag('config', 'G-VK9P9F9NZL');

            </script>
            <!-- End Google Analytics -->
        @endenv
        @routes
        <script>
            const pushchords = {appEnv: "{{env('APP_ENV')}}", gaTrackId: "{{env('GOOGLE_ANALYTICS_TRACKID')}}"}
        </script>
        <script src="{{ mix('js/app.js') }}" defer></script>
        @inertiaHead
    </head>
    <body class="font-body antialiased">
        @inertia

        @env ('local')
            <script src="http://localhost:8080/js/bundle.js"></script>
        @endenv
    </body>
</html>
