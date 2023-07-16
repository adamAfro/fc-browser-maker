declare const browser: any



export type Tab = { id: number }

export function setWidgetAction(callback: (Tab) => void) {

    browser.browserAction.onClicked.addListener(callback)
}



export function setPopup(url: string) {
    
    browser.browserAction.setPopup({ popup: url })
}

export async function getPopup() {
    
    const { id } = await getActiveTab()

    return browser.browserAction.getPopup({ tabId: id })
}

export function openPopup(url: string = '') {

    if (url)
        browser.browserAction.setPopup({ popup: url })

    browser.browserAction.openPopup()
}

export function removePopup() {

    browser.browserAction.setPopup({ popup: '' })
}




export type Message = {

    command: string
    title?: string
    data?: any
    pass?: boolean
}

export async function sendToBackground(message: Message) {

    return browser.runtime.sendMessage(message)
}

export async function getActiveTab() {

    return (await browser.tabs.query({ active: true, currentWindow: true }))[0] as 
        { id: number }
}

export async function sendToTab(id: number, message) {

    return browser.tabs.sendMessage(id, message)
}



export async function receive(callback: (message, sender, sendResponse) => void) {

    browser.runtime.onMessage.addListener(callback)
}


type TabsListener = ({ previousTabId, tabId, windowId }) => void
export async function reactToTabs(listener: TabsListener) {

    browser.tabs.onActivated.addListener(listener)
}

type TabListener = (tabId, changeInfo, tab) => void
export async function reactToTab(listener: TabListener) {

    browser.tabs.onUpdated.addListener(listener)
}