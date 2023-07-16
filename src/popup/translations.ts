import { getActiveTab, sendToBackground } 
    from "../components/browser"

import { AnimateArrayData } from "../components/scan"

import { loadRanking } from "../components/storage"

import { hasTranslations, loadTranslations } 
    from "../components/storage"

import { saveSetting } from "../components/storage"

import { printTable, classes, attrs, addTranslations } 
    from "../components/display"



showRanking()
showTranslations()
showCopyButton()
showQRCodes()

document.querySelector('button[data-command="reset"]')
    .addEventListener('click', async () => {
        
        await sendToBackground({ command: 'reset' })
        
        window.close()
    })



async function showCopyButton() {

    const tab = await getActiveTab()
    if (!(await hasTranslations(tab.id)))
        return false

    const copyButton = document
        .querySelector('button[data-command="copy"]')

    copyButton.parentElement.classList.remove('hidden')
    copyButton.addEventListener('click', copy)
}



async function copy() {

    const tab = await getActiveTab()
    const translations = await loadTranslations(tab.id)
    const separator = ','
    const clip = translations
        .map(([word, tr]) => word + separator + tr)
        .join('\n')

    await navigator.clipboard.writeText(clip)
}



async function showQRCodes() {

    const tab = await getActiveTab()
    const translations = await loadTranslations(tab.id)
    if  (!translations)
        return false

    const container = document.querySelector('.qr') as HTMLElement
    const scanAnimation = AnimateArrayData(translations, container.offsetWidth)
    const fpsInput = scanAnimation.querySelector('input[type="range"]') as HTMLInputElement
    
    fpsInput.addEventListener('input', saveFpsValue)

    container.append(scanAnimation)

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

    const tab = await getActiveTab()
    const ranking = await loadRanking(tab.id)
    if ( !ranking)
        return    

    const container = document.createElement('div')

    container.addEventListener('click', highlight)
    container.innerHTML = printTable(ranking)
    
    document.body.append(container)
}



async function showTranslations() {

    const tab = await getActiveTab()
    const translations = await loadTranslations(tab.id)
    if ( !translations)
        return
    
    const container = document.querySelector('.ranking')

    addTranslations(container, translations)
}



async function highlight(event: Event) {
        
    const word = (event.target as HTMLElement)
    if ( !word)
        return

    const tab = await getActiveTab()
    const ranking = await loadRanking(tab.id)
    if (!ranking.find(([w]) => w == word.textContent))
        return

    sendToBackground({
        command: 'highlight', pass: true,
        data: word.textContent
    })

    window.close()
}



export default null // ts workaround
