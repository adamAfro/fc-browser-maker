import { getActiveTab, sendToBackground } from "../components/browser"

import { loadRanking } from "../components/storage"

import { openPopup, setPopup as setPopup4Later } 
    from "../components/browser"



updateTranslateButton()

document.querySelector('button[data-command="reset"]')
    .addEventListener('click', async () => {
        
        await sendToBackground({ command: 'reset' })
        
        window.close()
    })



async function updateTranslateButton() {

    const tab = await getActiveTab()
    const ranking = await loadRanking(tab.id)
    const languageHash = '//'
    const wordTrack = ranking.
        map(([word]) => word).join('%0A')

    const translateButton = document
        .querySelector(`button[data-command="goto"]`) as HTMLElement

    translateButton.dataset.url += '#' + languageHash + wordTrack
    translateButton.addEventListener('click', requestTranslation)
}



function requestTranslation(event: Event) {

    const url = (event.target as HTMLElement).dataset.url

    openPopup(url)

    setPopup4Later('popup/menu.html')
}



export default null // ts workaround