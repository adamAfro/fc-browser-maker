import { load, openPopup, sendToBackground } from "./components/browser"


const translateButton = document
    .querySelector(`button[data-command="goto"]`)
translateButton.addEventListener('click', (event: Event) => {
    
    const url = (event.target as HTMLElement).dataset.url

    openPopup(url)

    sendToBackground({ command: "menu" })
})


const resetButton = document
    .querySelector('button[data-command="reset"]')
resetButton.addEventListener('click', () => {

    sendToBackground({ command: "reset" })
})




const copyButton = document
    .querySelector('button[data-command="copy"]')
copyButton.addEventListener('click', async () => {

    const translations = await load('translations')
    const separator = ','
    const clip = translations
        .map(([word, tr]) => word + separator + tr)
        .join('\n')

    await navigator.clipboard.writeText(clip)
})


export default null // ts workaround