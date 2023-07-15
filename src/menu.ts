document
    .querySelector(`button[data-command="goto"]`)
    .addEventListener('click', requestTranslation)

updateTranslateButton()
showCopyButton()
showQRCodes()
showRanking()
translate()



import { openPopup, sendToBackground } from "./components/browser"

function requestTranslation(event: Event) {

    const url = (event.target as HTMLElement).dataset.url

    openPopup(url)

    sendToBackground({ command: 'popup', data: 'menu.html' })
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



import { getActiveTab } from "./components/browser"
import { loadTranslations } from "./components/storage"

async function copy() {

    const tab = await getActiveTab()
    const translations = await loadTranslations(tab.id)
    const separator = ','
    const clip = translations
        .map(([word, tr]) => word + separator + tr)
        .join('\n')

    await navigator.clipboard.writeText(clip)
}

import { AnimateArrayData } from "./components/scan"

async function showQRCodes() {

    /** @TODO */
    const hasTranslation = true
    if (!hasTranslation)
        return false

    const container = document.querySelector('.qr') as HTMLElement

    const tab = await getActiveTab()
    const translations = await loadTranslations(tab.id)
    const scanAnimation = AnimateArrayData(translations, container.offsetWidth)
    const fpsInput = scanAnimation.querySelector('input[type="range"]') as HTMLInputElement
    
    fpsInput.addEventListener('input', saveFpsValue)

    container.append(scanAnimation)
}



import { saveSetting } from "./components/storage"

async function saveFpsValue(event: Event) {

    const fpsInput = event.target as HTMLInputElement
    
    await saveSetting('qrfps', fpsInput.value)
}



import { loadRanking } from "./components/storage"
import { printTable, classes, attrs, addTranslations } from "./components/display"

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

function highlight(event: Event) {
        
    const word = (event.target as HTMLElement)
    if (!word)
        return

    sendToBackground({
        command: 'highlight', pass: true,
        data: word.textContent 
    })

    window.close()
}



async function updateTranslateButton() {

    const tab = await getActiveTab()
    const ranking = await loadRanking(tab.id)
    const languageHash = '//'
    const wordTrack = ranking.
        map(([word]) => word).join('%0A')

    const translateButton = document
        .querySelector(`button[data-command="goto"]`) as HTMLElement

    translateButton.dataset.url += '#' + languageHash + wordTrack
}



async function translate() {

    const tab = await getActiveTab()
    const translations = await loadTranslations(tab.id)
    if ( !translations)
        return
    
    const container = document.querySelector('.ranking')

    addTranslations(container, translations)
}


export default null // ts workaround