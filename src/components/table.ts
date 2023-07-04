import { selector } from "./keys"

export const countAttrName = "data-" + selector + "-count"
export const tableCountAttrName = "data-" + selector + "-tier"
export const tableClassName = selector + "-table"


export default function render(element: Element, ranking: [string, number][]) {

    const container = document.createElement("div")
    element.append(container)
    container.innerHTML = print(ranking)
    hiddingSingles(container.querySelector("table"))

    return container
}



function print(ranking: [string, number][]) {

    const max = Math.max(...ranking.map(([w, n]) => n))
    const tags = ranking.map(([word, n]) => [n, printWord(word, n, max)])

    let html = ""
    for (let i = max; i >= 2; i--) {

        const counted = tags.filter(([n]) => n == i)
        
        if (counted.length == 0) continue

        html += `<tr ${tableCountAttrName}=${i}>
            <td><output>${i}</output></td>
            <td style="text-align:center">${counted.map(([n, tag]) => tag).join("")}</td>
        </tr>`
    }

    html += `<tr ${tableCountAttrName}=${1}>
        <td style="vertical-align:top"><button>...</button></td>
        <td style="text-align:left">
            ${tags.filter(([n]) => n == 1).map(([n, tag]) => tag).join("")}
        </td>
    </tr>`
    

    return `<table class="${tableClassName}">
        <tbody>${html}</tbody>
    </table>`
}



function hiddingSingles(table: HTMLTableElement) {

    const row = table.querySelector(`[${tableCountAttrName}="1"]`)
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
  
function printWord(word: string, n: number, max: number) {
    
    const style = `font-size:${n/max + 0.75}em;border:solid thin;border-radius:.25em;margin:.1em .5em;display:inline-block;padding:.2em;`

    return `<span style="position:relative">
        <output ${countAttrName}="${n}"style="${style}">${word}</output>
    </span>`.replaceAll(/\s+/g, " ")
}