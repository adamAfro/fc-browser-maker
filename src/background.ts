declare const browser: any

browser.browserAction
    .onClicked.addListener(toogleTabSelection)

browser.runtime
    .onMessage.addListener(handleMessage)


let selecting = false
function toogleTabSelection(tab) {

    selecting = true
    browser.tabs.sendMessage(tab.id, { 
        command: "select" 
    }, (response) => {

        selecting = false

        browser.browserAction.setPopup({ popup: 'menu.html' })
    })
}

async function handleMessage(message, sender, sendResponse) {

    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })

    browser.tabs.sendMessage(tab.id, { 
        command: "clear" 
    }, (response) => {

        browser.browserAction.setPopup({ popup: '' })
    })
}