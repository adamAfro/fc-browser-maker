import { 
    setWidgetAction, setPopup, removePopup,
    receive, sendToActiveTab 
} from "./components/browser"


setWidgetAction(async (tab) => {

    await sendToActiveTab({ command: "select" })
    
    setPopup('menu.html')
})



receive(async (message, sender, sendResponse) => { 

    if (message.command == "debug") 
        console.debug(message)

    if (message.pass) {

        delete message.pass

        return sendToActiveTab(message)
    }

    if (message.command == "menu") 
        return setPopup('menu.html')

    if (message.command == "reset") {

        await sendToActiveTab({ command: "clear" })
        
        removePopup()
    }
})



export default null // ts workaround