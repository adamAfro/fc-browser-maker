# FC browser maker :black_joker:

Browser extension for automated flashcards making :gear:

It gathers word from a text, counts them and seeks for
translations

## Browsers

- [ ] firefox :mechanic:
- [ ] chrome :zzz:
- [ ] opera :zzz:

## Howto?

- install
- click extension button
- select a text on a website
- click extension button for a popup (:fox_face: firefox seems to need it for now [user gesture])
- select action, either:
    - a popup will open up and a 3rd party website will be rendered and live-scrapped in it
    - some background calls for scrapping will be done, with popup having loading screen
- click extension button for a popup (:fox_face:)
- view:
    - ranking of the words with their translations
    - copy button for CSV copy (for quizlet for eg.)
    - QR code slideshow for scanning (see [FCQR](https://github.com/adamAfro/fcqr))

### Supported Websites 

#### Live-Scrap

Some websites work with JS, so casual scrapping won't do much.
Headless browser seems not adequate when you have normal browser
and not a terabyte-need of data, so a popup it is

Also it looks cooler

Supported:

- deepl.com/translate

Planned:

- chat.open.ai

#### Background scrap

Some websites can be scrapped with normal `fetch` API, and that is
prefered for simplicity, speed and network usage

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
- bundling: [esbuild](https://esbuild.github.io/)&[deno](https://deno.land/):\
    `deno run -A --watch=./src bundle.js`
- datalog/[datamatrix-svg](https://github.com/datalog/datamatrix-svg) under MIT

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
    <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />
    This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
</a>.