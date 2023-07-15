
/** Use for customizing classes 
 * @example
 * import { classes } from "./components/display"
 * Object.assign(classes, {
 *   'table': 'ranking',
 *   'word': 'word', 'translation': 'translation',
 * })
 */
export const classes = { 
    table: undefined, 
    word: undefined, 
    translation: undefined,
    wrapper: undefined
}

/** Use for customizing attributes
 * @example
 * import { attrs } from "./components/display"
 * Object.assign(attrs, { count: 'data-count' })
 */
export const attrs = {
    count: undefined
}



export function printTable(ranking: [string, number][]) {

    const max = Math.max(...ranking.map(([w, n]) => n))
    const tags = ranking.map(([word, n]) => [n, printWord(word, n, max)])

    let html = ""
    for (let i = max; i >= 1; i--) {

        const counted = tags.filter(([n]) => n == i)
        
        if (counted.length == 0) continue

        html += `<tr ${attrs.count}="${i}">
            <td><output>${i}</output></td>
            <td style="text-align:center">${counted.map(([n, tag]) => tag).join("")}</td>
        </tr>`
    }

    return `<table ${classes.table ? `class="${classes.table}"` : ''}>
        <tbody>${html}</tbody>
    </table>`
}



export function addTranslations(container: Element, translations: [string, string][]) {

    const words = container
        .getElementsByClassName(classes.word)
    for (const word of words) {

        const match = ([w]: [string, string]) => 
            w.trim().toLocaleLowerCase() ==
            word.textContent.trim().toLocaleLowerCase()

        const translation = translations.find(match)
        if (!translation) 
            continue
        
        const container = word.nextElementSibling
        container.textContent = translation[1]
    }
}


  
function printWord(word: string, n: number, max: number) {
    
    const style = `font-size:${n/max + 0.75}em;`

    return `<span ${classes.wrapper ? `class="${classes.wrapper}"` : ''}>
        <output ${classes.word ? `class="${classes.word}"` : ''} ${attrs.count}="${n}" style="${style}">${word}</output>
        <output ${classes.translation ? `class="${classes.translation}"` : ''} ${attrs.count}="${n}" style="${style}"></output>
    </span>`.replaceAll(/\s+/g, " ")
}