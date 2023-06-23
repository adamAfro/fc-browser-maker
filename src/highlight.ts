import { selector } from "./keys"

export const className = selector + "-highlight"
export const rankAttrName = "data-" + selector + "-rank"



export function prepare(container: Element, ranking: [string, number][]) {

    const nodes = Array.from(container.childNodes)

    const textNodes = nodes.filter(node => node.nodeType == Node.TEXT_NODE) as Text[]
    const bound = Math.max(...ranking.map(([_, n]) => n))
    const taggify = (node: Text) => node.replaceWith(...tagContent(node, ranking, bound))
    textNodes.forEach(taggify)

    let tagNodes = nodes.filter(node => node.nodeType == Node.ELEMENT_NODE) as Element[]
    tagNodes = tagNodes.filter(element => !element.hasAttribute(rankAttrName))
    for (const node of tagNodes)
        prepare(node, ranking)
}



export function canGlow(node: Node | EventTarget | Element) {

    return node instanceof HTMLSpanElement && 
        (node as Element).hasAttribute(rankAttrName)
}



export function highlight(container: Element, word = '') { 

    word = word.trim()

    const content = Array.from(container.querySelectorAll(`[${rankAttrName}]`))
    const highlighted = content.filter(x => x.textContent.trim() == word)

    highlighted.forEach(x => x.classList.add(className))
}


export function unhighlight(container: Element) {

    const highlighted = Array.from(container.querySelectorAll(`[${rankAttrName}].${className}`))
    highlighted.forEach(x => x.classList.remove(className))
}



function tagContent(node: Text, ranking: [string, number][], bound = 1) {

    const text = node.textContent
    const words = text.split(/(\s+)/)
    if (words.length == 0)
        return []

    const tagStringRanked = word => tagString(word, ranking, bound)

    return words.map(tagStringRanked)
}



function tagString(x: string, ranking: [string, number][], bound = 1) {

    if (x.trim().length == 0)
        return document.createTextNode(x)

    const tag = document.createElement("span")
    const rank = ranking.find(([word]) => word == x)
    if (rank) {
        
        const n = rank[1]

        tag.setAttribute(rankAttrName, n.toString())
    }
        

    tag.textContent = x

    return tag
}