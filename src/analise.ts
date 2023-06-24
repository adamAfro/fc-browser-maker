/** Map elements and their counts to map */
function count(array: any[]): Map<any, number> {

    const counts: Map<any, number> = new Map()
    array.forEach(element => counts.has(element) ? 
        counts.set(element, counts.get(element) + 1) : 
        counts.set(element, 1)
    )

    return counts
}

export function rank(words: string[]): [any, number][] {

    const counted = [...count(words).entries()]
        .sort(( [w1, n1], [w2, n2] ) => n2 - n1)

    return counted
}


export function canBeAnalised(element) {

    return element.textContent.length > 256 &&
        element instanceof Element
}

export function analiseContent(element) {

    const words = element.textContent.toLocaleLowerCase()
        .split(/\s+/g).filter(w => w.length > 0)
    const ranking = rank(words) as [string, number][]
    
    return ranking
}