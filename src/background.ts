import { Command, getActiveTab } 
    from "./components/browser"

import { setMenuAction }
    from "./components/browser"

import { sendToTab, receive, Message }
    from "./components/browser"

import { setPopup, removePopup, openPopup, popupWindow } 
    from "./components/browser"

import { saveRanking, resetRanking, resetTranslations } 
    from "./components/storage"

import { saveTranslations } 
    from "./components/storage"


import { resetData } from "./components/storage"

import analise from "./components/analise"


import { configuration as config } from "./components/browser"



const menuPrompt = config.language.toLocaleLowerCase() == 'pl' ?
    'Twórz fiszki' : 'Make flashcards'



resetData()

setMenuAction(menuPrompt, async (info) => {

    if (!info.selectionText)
        return

    const ranking = analise(info.selectionText)

    await openPopup('popup/menu.html')
    await saveRanking(ranking)

})

receive(async (message: Message) => {

    if (message.command == Command.Take)
        return takeData(message.title, message.data)

    if (message.command == Command.Popup)
        return popupWindow(message.data)

    if (message.command == Command.Reset) {

        resetRanking()
        resetTranslations()
        removePopup()

        return
    }
    
    if (message.command == Command.Cancel) {

        resetTranslations()
        setPopup('popup/menu.html')

        return
    }
    
    return console.debug(message)
})


async function takeData(title: string, data: any) {

    if (title == 'ranking') {

        await setPopup('popup/menu.html')
        await saveRanking(data as [string, number][])

        return
    }

    if (title = 'translations') {

        await setPopup('popup/translations.html')
        await saveTranslations(data as [string, number][])
        await popupWindow('popup/translations.html')
    }
}



async function sendToActiveTab(message: Message) {

    const { id } = await getActiveTab()

    return sendToTab(id, message)
}


export default null // ts workaround