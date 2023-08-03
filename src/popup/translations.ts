import { sendToBackground, Command } 
    from "../components/browser"

import { AnimateArrayData, startMatricesAnimation } 
    from "../components/scan"

import { loadRanking } from "../components/storage"

import { hasTranslations, loadTranslations } 
    from "../components/storage"

import { loadSetting, saveSetting } from "../components/storage"

import { printTable, classes, attrs, addTranslations } 
    from "../components/display"



showRanking()
showTranslations()
showCopyButton()
showQRCodes()

document.querySelector('button[data-command="reset"]')
    .addEventListener('click', async () => {
        
        await sendToBackground({ command: Command.Reset })
        
        window.close()
    })

document.querySelector('button[data-command="cancel"]')
    .addEventListener('click', async () => {
        
        await sendToBackground({ command: Command.Cancel })
        
        window.close()
    })


window.addEventListener("resize", async (event) => {

    await saveSetting('width', window.innerWidth)
    await saveSetting('height', window.innerHeight)
})


async function showCopyButton() {

    if (!(await hasTranslations()))
        return false

    const copyButton = document
        .querySelector('button[data-command="copy"]')

    copyButton.parentElement.classList.remove('hidden')
    copyButton.addEventListener('click', copy)
}



async function copy() {

    const translations = await loadTranslations()
    const separator = ','
    const clip = translations
        .map(([word, tr]) => word + separator + tr)
        .join('\n')

    await navigator.clipboard.writeText(clip)
}



async function showQRCodes() {

    const translations = await loadTranslations()
    if  (!translations)
        return false

    const container = document.querySelector('.qr') as HTMLElement
    const matrices = AnimateArrayData(translations, container.offsetWidth)

    container.append(...matrices)

    const fpsInput = container.parentElement
        .querySelector('input[type="range"]') as HTMLInputElement
    loadSetting('qrfps')
        .then(value => { if (value) fpsInput.value = value })
    
    fpsInput.addEventListener('input', saveFpsValue)

    startMatricesAnimation(matrices, fpsInput)

    return true
}



async function saveFpsValue(event: Event) {

    const fpsInput = event.target as HTMLInputElement
    
    await saveSetting('qrfps', fpsInput.value)
}

    

Object.assign(classes, {
    'table': 'ranking', 'wrapper': 'wrapper',
    'word': 'word', 'translation': 'translation',
}), Object.assign(attrs, { count: 'data-count' })

async function showRanking() {

    const ranking = await loadRanking()
    if ( !ranking)
        return    

    const container = document.createElement('div')

    container.innerHTML = printTable(ranking)
    
    document.body.append(container)
}



async function showTranslations() {

    const translations = await loadTranslations()
    if ( !translations)
        return
    
    const container = document.querySelector('.ranking')

    addTranslations(container, translations)
}



export default null // ts workaround
