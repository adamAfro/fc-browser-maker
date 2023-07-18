import { canBeAnalised, analiseContent } from "./analise"

import { mark as markAttr, selector } from "./keys"

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

    let element = event.target as Element
    while(!canBeAnalised(element) && element.parentElement)
        element = element.parentElement

    if (element && canBeAnalised(element))
        element.classList.add(classNameHover)
}



export function select(element: Node | Element) {

    element = getNearestSelectable(element)
    if (!element)
        return null

    const ranking = analiseContent(element)
    toogle(false)

    Selection.mark(element as HTMLElement)

    return ranking
}



export function getNearestSelectable(element: Node | Element) {

    while(!canBeAnalised(element) && element.parentElement)
        element = element.parentElement

    if (!element || !canBeAnalised(element))
        return null

    return element
}



export namespace Selection {

    export function mark(element: HTMLElement) {

        element.dataset[markAttr] = 'true'
    }

    export function unmark() {

        const selection = document.querySelector(`[data-${markAttr}]`)
        if ( !selection)
            return
    
        selection.removeAttribute(`data-${markAttr}`)
    }

    export function check() {

        if (document.querySelector(`[data-${markAttr}]`))
            return true
    
        return false
    }

    export function get() {
        
        return document.querySelector(`[data-${markAttr}]`)
    }
}