import { selector } from "./keys"

export default function(words: string[]) {

    const ranking = rank(words)
    const max = Math.max(...ranking.map(([w, n]) => n))
    const tags = ranking.map(([word, n]) => [n, render(word, n, max)])

    let html = ""
    for (let i = max; i >= 2; i--) {

        const counted = tags.filter(([n]) => n == i)
        
        if (counted.length == 0) continue

        html += `<tr data-count=${i}>
            <td>${i}</td>
            <td style="text-align:center">${counted.map(([n, tag]) => tag).join("")}</td>
        </tr>`
    }

    html += `<tr data-count=${1}>
        <td style="vertical-align:top"><button>...</button></td>
        <td style="text-align:left">
            ${tags.filter(([n]) => n == 1).map(([n, tag]) => tag).join("")}
        </td>
    </tr>`
    

    return `<table>
        <tbody>${html}</tbody>
    </table>`
}

export function hidding(table: HTMLTableElement) {

    const row = table.querySelector(`[data-count="1"]`)
    const button = row.querySelector(` button`)
    const tags = Array.from(row.querySelectorAll("output"))

    fold(tags)

    button.addEventListener("click", event => fold(tags))
}

function fold(tags: HTMLElement[]) {

    tags.slice(3).forEach(tag => {

        tag.style.display == "none" ? 
            tag.style.display = "inline-block" :
            tag.style.display = "none"
    })
}
  
/** HTML that contains hidden elements that are rendered, so other function can displace them well */
function render(word: string, n: number, max: number) {
    
    return `<output data-occurences="${n}"
        style="font-size:${10*(n/max) + 0.75}em;border:solid thin;border-radius:.25em;margin:.5em;display:inline-block;padding:.2em">${word}
    </output>`.replaceAll(/\s+/g, " ")
}

/** Map elements and their counts to map */
function count(array: any[]) {

    const counts: Map<any, number> = new Map()
    array.forEach(element => counts.has(element) ? 
        counts.set(element, counts.get(element) + 1) : 
        counts.set(element, 1)
    )

    return counts
}

/** Count words and order them by amount of occurences */
function rank(words: string[]) {

    const counted = [...count(words).entries()]
        .sort(( [w1, n1], [w2, n2] ) => n2 - n1)

    return counted
}