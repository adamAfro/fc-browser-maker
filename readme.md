# FC browser maker :black_joker:

Browser extension for automated flashcards making :gear: - it gathers words from a text, counts them and seeks for
translations. Then QR code [can be scanned](https://github.com/adamAfro/fcqr)

No longer developed, I splited idea into 2: [Popup GPT](https://github.com/adamAfro/Popup-GPT) and [QR Selection](https://github.com/adamAfro/browser-qrselect)

## Features and TODOs

- [x] :iphone: making scannable QR codes with CSV `term,definition` flashcards
- [x] :mouse_trap: making selections with cursor
- [ ] :bookmark_tabs: sending (also through QR) selection itself as reference
- [ ] :paintbrush: UI design
- [ ] :people_hugging: general purpose functionalities:
    - [x] :mouse_trap: converting selection to flashcards with translations (deepl.com)
    - [ ] :robot: converting selection to chat GPT definitions flashcards (chat.openai.com)
- [x] :fox_face: firefox extension
- [ ] :ringed_planet: chrome extension

\*replaceing highlighting with 
[find API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/find/find) 
could remove need for read-all permissions for all pages, given that selecting is done properly

## Howto?

0. install from [addons page](https://addons.mozilla.org/pl/firefox/addon/flashcards-maker/)
1. select text, click right mouse button and select `Make flashcards` from context menu
2. select option from popup
    - a popup will live-scrap a 3rd party website
    - some background calls for scrapping will be done, with popup having loading screen
3. view in popup, you can get back to it with extension button:
    - ranking of the words with their translations
    - copy button for CSV copy (for quizlet for eg.)
    - QR code slideshow for scanning (see [FCQR](https://github.com/adamAfro/fcqr))

:warning: Scrapping 3rd party websites opens popups in new window and closes them immediately after scrap, see
`src/menu.ts` and `src/pages/*`

## Scrapping Websites

Network usage of scrapping is dependent of form data is given.

### Live-Scrap

Some websites work with JS, so casual scrapping won't do much.
Headless browser seems not adequate when you have normal browser
and not a terabyte-need of data, so a popup it is

Also it looks cooler

Live scarp tends to be more compact and as such may require
less network usage.

### Background scrap

Some websites can be scrapped with normal `fetch` API, and that is
prefered for simplicity and speed

- drawbacks - most of website's don't support wide CORS so proxies may be needed

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
