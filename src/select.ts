import { canBeAnalised, analiseContent } from "./analise"
import { selector } from "./keys"

export const classNameHover = selector + "-hover"

export function toogle(value: boolean): void {

    if (value) {

        document.body.addEventListener("mousemove", hover)
        document.body.addEventListener("click", unhover)

    } else {

        unhover()
        document.body.removeEventListener("mousemove", hover)
        document.body.removeEventListener("click", unhover)
    }
}




function unhover(): void {

    const selected = document.getElementsByClassName(classNameHover)
    Array.from(selected)
        .forEach(({ classList }) => classList.remove(classNameHover))
}

function hover(event: Event): void {

    unhover()

    const element = event.target as Element
    if (canBeAnalised(element))
        element.classList.add(classNameHover)
}



export function select(element: Node | Element | EventTarget) {

    if (!canBeAnalised(element))
        return null

    const ranking = analiseContent(element)

    return ranking
}