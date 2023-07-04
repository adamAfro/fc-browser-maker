import { openPopup, sendToBackground } from "./components/browser"


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


export default null // ts workaround