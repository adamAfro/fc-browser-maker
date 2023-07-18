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

    const translateBtn = document
        .querySelector(`button[data-command="goto"]`) as HTMLElement

    const tab = await getActiveTab()
    const ranking = await loadRanking(tab.id)
    const wordTrack = ranking.
        map(([word]) => word).join('%0A')

    translateBtn.dataset.wordTrack = wordTrack
    translateBtn.addEventListener('click', requestTranslation)
}



/**
 * @example
 * document.insertAdjacentHTML('beforeend', html`
 *      <div>
 *          <button data-command="goto" ...></button>
 *          <input/>
 *          <input/>
 *      </div>`)
 * updateTranslateButton()
 */
async function requestTranslation(event: Event) {

    const translateBtn = event.target as HTMLButtonElement

    const locales = Array.from(translateBtn.parentElement.querySelectorAll('input'))
    const languageHash = (locales[0]?.value || '') + '/' + (locales[1]?.value || '') + '/'

    let url =
        translateBtn.dataset.url + '#' + 
        languageHash + 
        translateBtn.dataset.wordTrack

    openPopup(url)
    setPopup4Later('popup/menu.html')
}



export default null // ts workaround