/** Map elements and their counts to map */
function count(array: any[]) {

    const counts: Map<any, number> = new Map()
    array.forEach(element => counts.has(element) ? 
        counts.set(element, counts.get(element) + 1) : 
        counts.set(element, 1)
    )

    return counts
}

export function rank(words: string[]) {

    const counted = [...count(words).entries()]
        .sort(( [w1, n1], [w2, n2] ) => n2 - n1)

    return counted
}