# Wordsum

- [x] selecting nodes on a website
- [x] showing summary and highlighting words
- [x] opening ~~google translate~~ deepl in popup and getting translation from it
    - google's translator doesn't like being in a popup - it is a whole 1 px wide
- [ ] sending prompt to GPT in popup and getting some output



## Development

Bundling with [esbuild](https://esbuild.github.io/) and [deno](https://deno.land/) 
after each change to files:

```
deno run -A --watch=./src bundle.js
```