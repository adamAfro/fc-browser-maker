import { selector } from "./keys"

export default function toogle(value: boolean): void {

    if (value) {

        document.body.addEventListener("mousemove", mark)
        document.body.addEventListener("click", select)

    } else {

        unmark()
        document.body.removeEventListener("mousemove", mark)
        document.body.removeEventListener("click", select)
    }
}

function unmark(): void {

    const selected = document.getElementsByClassName(selector)
    Array.from(selected)
        .forEach(({ classList }) => classList.remove(selector))
}

function mark(event: Event): void {

    unmark()

    const element = event.target as Element
    element.classList.add(selector)
}

function select(event: Event): void {
    
    const element = event.target as Element
    const words = element.textContent.split(" ")

    const counted = count(words)

    console.info([...counted.entries()].sort(( [w1, v1], [w2, v2] ) => v1 - v2))
}

function count(array: any[]) {

    const counts: Map<any, number> = new Map()
    array.forEach(element => counts.has(element) ? 
        counts.set(element, counts.get(element) + 1) : 
        counts.set(element, 1)
    )

    return counts
}