import { load, openPopup, save, sendToBackground } from "./components/browser"

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
    const fpsInput = scanAnimation.querySelector('input[type="range"]') as HTMLInputElement
    
    fpsInput.addEventListener('input', saveFpsValue)

    document.body.append(scanAnimation)
}

async function saveFpsValue(event: Event) {

    const fpsInput = event.target as HTMLInputElement
    
    await save('qrfps', fpsInput.value)
}


export default null // ts workaround