// deno run -A --watch=./src bundle.ts

import { build, stop } from 'https://deno.land/x/esbuild@v0.18.11/mod.js'

const scripts = ['content', 'background', 'popup']
const pageScripts = ['content.deepl.com']

for (const name of [scripts, pageScripts].flat()) await build({
  
    entryPoints: [`./src/${name}.ts`],  
    outfile: `./${name}.js`,

    bundle: true, loader: { '.css': 'text' },

}).catch(e => console.error(e))

stop()