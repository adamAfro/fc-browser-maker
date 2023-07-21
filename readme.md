# FC browser maker :black_joker:

Browser extension for automated flashcards making :gear:

It gathers word from a text, counts them and seeks for
translations

## Browsers

- [ ] firefox :mechanic:
- [ ] chrome :zzz:
- [ ] opera :zzz:

## Howto?

- install in firefox-dev-edition until it is signed by mozilla at 
    [addons page](https://addons.mozilla.org/pl/firefox/addon/flashcards-maker/)
- :mouse:x2 click extension button and select a text on a website
- :mouse:x3 click extension button for a popup :fox_face: 
    select action and click extension button for a popup :fox_face: either
    - a popup will live-scrap a 3rd party website
    - some background calls for scrapping will be done, with popup having loading screen
- :mouse: click extension button for a popup :fox_face: and view:
    - ranking of the words with their translations
    - copy button for CSV copy (for quizlet for eg.)
    - QR code slideshow for scanning (see [FCQR](https://github.com/adamAfro/fcqr))

:fox_face: - firefox lets opening popup only from background script
    and so a lot of clicking (:mouse:x6 could be 3) is required for now

### Supported Websites 

Network usage of scrapping is dependent of form data is given.

#### Live-Scrap

Some websites work with JS, so casual scrapping won't do much.
Headless browser seems not adequate when you have normal browser
and not a terabyte-need of data, so a popup it is

Also it looks cooler

Supported:

- deepl.com/translate

Planned:

- chat.open.ai

Live scarp tends to be more compact and as such may require
less network usage.

#### Background scrap

Some websites can be scrapped with normal `fetch` API, and that is
prefered for simplicity and speed

Planned:

- treccani.it/enciclopedia

## Why?

:speech_balloon: There's a plenty of language flashcards up there, in the internet.
The thing is - I don't care! I don't care about making 100th account for a service,
paying for sets or tracking my *progress* with a ton of fillers and adds 
('cause I am not paying), probably like most of people [1]. 2nd thing is that 
I would like to read something in a language I study, but I don't know all the words, aye.

---

[1] I don't know really

## Dev and Deps

- developed and tested with firefox :fox_face:
- bundling requirements: [deno](https://deno.land/)&[esbuild](https://esbuild.github.io/)
    - install deno and optionally cache `esbuild` with `deno cache https://deno.land/x/esbuild@v0.18.11/mod.js`
    - bundle with `deno run bundle.js` accepting prompts and make `xpi` file with `./zip.sh`
    - while developing, use: `deno run -A --watch=./src bundle.js`
- datalog/[datamatrix-svg](https://github.com/datalog/datamatrix-svg) under MIT

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
    <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />
    This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
</a>.