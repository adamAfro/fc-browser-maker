import { selector } from "./keys"
import { default as print, hidding } from "./table"

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
    if (element.textContent.length > 256)
        element.classList.add(selector)
}

function select(event: Event): void {
    
    unmark()

    const element = event.target as Element
    if (element.textContent.length < 256)
        return

    const words = element.textContent.toLocaleLowerCase()
        .split(/\s+/g).filter(w => w.length > 0)

    const container = document.createElement("div")

    element.append(container)

    container.innerHTML = print(words)
    hidding(container.querySelector("table"))

    toogle(false)
}