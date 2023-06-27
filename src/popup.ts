const popupContext = window
const popup = document
let isMenu = true

const translateButton = popup.querySelector(`button[data-command="goto"]`)
translateButton.addEventListener('click', handleURLChange)

const resetButton = popup.querySelector('button[data-command="reset"]')
resetButton.addEventListener('click', handleReset)


/**
 * @TODO reset popup to menu after lost focus -
 * for some reason unload and blur did't work as I wanted...
 */



function handleURLChange(event: Event) {
    
    const url = (event.target as HTMLElement).dataset.url

    isMenu = (url != 'menu.html')

    browser.browserAction.setPopup({ popup: url })
    browser.browserAction.openPopup() // setPopup is not enough
}


function handleReset() {

    browser.runtime.sendMessage({ command: "reset" })
}