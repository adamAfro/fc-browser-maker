const outputContainer = document
    .querySelector(".lmt__target_textarea") as HTMLElement



import { sendToBackground, Command } from "../components/browser"

const changeCheck = setInterval(async () => {
    
    if (!outputContainer.textContent.length) 
        return

    clearInterval(changeCheck)
    
    new Promise(resolve => setTimeout(resolve, 300))

    await sendToBackground({
        command: Command.Take, title: 'translations', 
        data: await getContent()
    })

    window.close()
    // https://discourse.mozilla.org/t/can-an-extension-close-its-own-popup-opened-by-a-browseraction-or-pageaction/38645
    /*
     * Actually it’s not that simple once you try to port your code 
     * for Firefox for Android. In there, pop-ups are tabs and window.close() 
     * will suddenly not work anymore :slight_smile:

     * You will have to use browser.tabs.getCurrent().then(tab => browser.tabs.remove(tab.id)). 
     * Plus you need to detect that you are running Android using
     *  browser.runtime.getPlatformInfo() function.
     */

}, 100)



async function getContent() {

    const containers = [
        document.querySelector('.lmt__source_textarea') as HTMLElement,
        document.querySelector('.lmt__target_textarea') as HTMLElement
    ]
    
    const contents = containers.map(container => container.innerText.split('\n'))
        .map(content => content.map(w => w.trim()).filter(w => w.length > 0))

    const translations = zip(contents)

    return translations
}



function zip(arrays) {

    const zipped = []
    for (let i = 0; i < arrays[0].length; i++) {
        
        zipped.push([])
        for (let j = 0; j < arrays.length; j++)
            zipped[i].push(arrays[j][i])
    }

    return zipped
}


export default null // ts workaround