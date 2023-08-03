import { loadSetting } from "./storage"

declare const browser: any



export type Tab = { id: number }

export function setWidgetAction(callback: (Tab) => void) {

    browser.browserAction.onClicked.addListener(callback)
}



export function setPopup(url: string) {
    
    return browser.browserAction.setPopup({ popup: url })
}

export async function getPopup() {
    
    const { id } = await getActiveTab()

    return browser.browserAction.getPopup({ tabId: id })
}

export function openPopup(url: string = '') {

    if (url)
        browser.browserAction.setPopup({ popup: url })

    return browser.browserAction.openPopup()
}

export function removePopup() {

    return browser.browserAction.setPopup({ popup: '' })
}

/** @TODO save previous window size */
export function popupWindow(url: string) {

    return browser.windows.create({ url,
        type: "popup", 
        width: 512,
        height: 512
    })
}


export enum Command {

    Take = 'take',
    Popup = 'popup',
    Reset = 'reset',
    Cancel = 'cancel'
}

export type Message = {

    command: Command
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



type Info = { selectionText: string }
export async function setMenuAction(title: string, action: (info: Info, tab: Tab) => void, contexts: string[] = ['all']) {

    await browser.contextMenus.create({
        title, id: title.toLocaleLowerCase().replaceAll(' ', '-'),
        contexts
    }, () => void browser.runtime.lastError)

    await browser.contextMenus.onClicked.addListener(action)
}



export const configuration = {

    language: navigator.language,
}