import { reactToTabs, setWidgetAction, getActiveTab, reactToTab } 
    from "./components/browser"

import { sendToTab, receive, Message }
    from "./components/browser"

import { setPopup, removePopup } 
    from "./components/browser"

import { saveRanking, hasRanking, resetRanking, resetTranslations } 
    from "./components/storage"

import { saveTranslations, hasTranslations } 
    from "./components/storage"

import { resetData } from "./components/storage"


resetData()
setWidgetAction(tab => sendToActiveTab({ command: 'select' }))

reactToTabs(async ({ tabId }) => {

    const hasSelection = await sendToActiveTab({ 
        command: 'check', title: 'selection'
    })

    if (!hasSelection)
        return removePopup()

    if (hasTranslations(tabId))
        return setPopup('popup/translations.html')

    if (hasRanking(tabId))   
        return setPopup('popup/menu.html')

    return removePopup()
})

reactToTab(async (tabId, changeInfo) => {

    const hasLoaded = changeInfo.url || changeInfo.status === "complete"
    if (hasLoaded)
        reset(tabId)
})



receive(async (message: Message) => { 

    if (message.pass) {

        delete message.pass

        return sendToActiveTab(message)
    }

    if (message.command == 'take')
        return takeData(message.title, message.data)

    if (message.command == 'popup')
        return setPopup(message.data)

    if (message.command == 'reset') {

        const tab = await getActiveTab()
        
        return reset(tab.id)
    }
        

    return console.debug(message)
})


async function takeData(title: string, data: any) {

    if (title == 'ranking') {
        
        const tab = await getActiveTab()

        await setPopup('popup/menu.html')
        await saveRanking(tab.id, data as [string, number][])

        return
    }

    if (title = 'translations') {

        const tab = await getActiveTab()

        await setPopup('popup/menu.html')
        await saveTranslations(tab.id, data as [string, number][])
    }
}



async function sendToActiveTab(message: Message) {

    const { id } = await getActiveTab()

    return sendToTab(id, message)
}



function reset(tabId) {

    resetRanking(tabId)
    resetTranslations(tabId)
    removePopup()
}



export default null // ts workaround