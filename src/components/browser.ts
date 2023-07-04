declare const browser: any

export async function load(key) {

    return (await browser.storage.local.get(key))[key]
}

export async function save(key, data) {

    return browser.storage.local.set({ [key]: data})
}






export type Tab = { id: number }

export function setWidgetAction(callback: (Tab) => void) {

    browser.browserAction.onClicked.addListener(callback)
}



export function setPopup(url: string) {
    
    browser.browserAction.setPopup({ popup: url })
}

export function openPopup(url: string = '') {

    if (url)
        browser.browserAction.setPopup({ popup: url })

    browser.browserAction.openPopup()
}

export function removePopup() {

    browser.browserAction.setPopup({ popup: '' })
}



export async function sendToBackground(message) {

    return browser.runtime.sendMessage(message)
}

export async function sendToActiveTab(message) {

    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })

    return browser.tabs.sendMessage(tab.id, message)
}

export async function sendToTab(id: number, message) {

    return browser.tabs.sendMessage(id, message)
}



export async function receive(callback: (message, sender, sendResponse) => void) {

    browser.runtime.onMessage.addListener(callback)
}
