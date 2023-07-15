import { reactToTabs, setWidgetAction, removePopup } 
    from "./components/browser"

setWidgetAction(tab => sendToActiveTab({ command: 'select' }))

reactToTabs(removePopup)



import { receive, Message, setPopup } 
    from "./components/browser"

receive(async (message: Message) => { 

    if (message.pass) {

        delete message.pass

        return sendToActiveTab(message)
    }

    if (message.command == 'take')
        return takeData(message.title, message.data)

    if (message.command == 'popup')
        return setPopup(message.data)

    return console.debug(message)
})


import { getActiveTab,  } from './components/browser'
import { saveRanking, saveTranslations } 
    from "./components/storage"

async function takeData(title: string, data: any) {

    if (title == 'ranking') {
        
        const tab = await getActiveTab()

        await setPopup('menu.html')
        await saveRanking(tab.id, data as [string, number][])

        return
    }

    if (title = 'translations') {

        const tab = await getActiveTab()

        await setPopup('menu.html')
        await saveTranslations(tab.id, data as [string, number][])
    }
}



import { sendToTab } from "./components/browser"

async function sendToActiveTab(message: Message) {

    const { id } = await getActiveTab()

    return sendToTab(id, message)
}



export default null // ts workaround