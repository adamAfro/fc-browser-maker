import { load, openPopup, sendToBackground } from "./components/browser"

document
    .querySelector(`button[data-command="goto"]`)
    .addEventListener('click', translate)

document
    .querySelector('button[data-command="reset"]')
    .addEventListener('click', reset)

showCopyButton()
showDataMatrix()


function translate(event: Event) {

    const url = (event.target as HTMLElement).dataset.url

    openPopup(url)

    sendToBackground({ command: "menu" })
}


function reset() {

    sendToBackground({ command: "reset" })
}



async function showCopyButton() {

    /** @TODO */
    const hasTranslation = true
    if (!hasTranslation)
        return false

    const copyButton = document
        .querySelector('button[data-command="copy"]')

    copyButton.parentElement.classList.remove('hidden')
    copyButton.addEventListener('click', copy)
}

async function copy() {

    const translations = await load('translations')
    const separator = ','
    const clip = translations
        .map(([word, tr]) => word + separator + tr)
        .join('\n')

    await navigator.clipboard.writeText(clip)
}


import { AnimateArrayData } from "./components/scan"

async function showDataMatrix() {

    /** @TODO */
    const hasTranslation = true
    if (!hasTranslation)
        return false

    const translations = (await load('translations')) as [string, string][]
    const scanAnimation = AnimateArrayData(translations)

    document.body.append(scanAnimation)
}


export default null // ts workaround