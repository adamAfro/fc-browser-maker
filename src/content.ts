declare const browser: any


document.head.insertAdjacentHTML("beforeend", `<style>${CSS}</style>`)

browser.runtime
    .onMessage.addListener(handleMessage)



import CSS from "./components/styles"
import { toogle as setSelectingMode, select } from "./components/select"

import { 
    prepare as prepareHighlight, 
    highlight, unhighlight 
} from "./components/highlight"

import { 
    default as renderTable, 
    countAttrName as tableAttr, 
    tableClassName
} from "./components/table"

function handleMessage(message, sender, sendResponse) {

    if (message.command == "clear")
        return clearOutput()

    if (message.command == "select") {

        setSelectingMode(true)
        const respond = (event: Event) => render(event, sendResponse)
        document.body
            .addEventListener("click", respond, { once: true })
        
        return true // to keep the bg-script waiting for response
    }
}


function render(event: Event, sendResponse: (response: any) => void) {

    const container = event.target as Element

    const ranking = select(event.target)
    setSelectingMode(false)

    prepareHighlight(container, ranking)
    function highlightEvent(event: Event) {

        unhighlight(container)
        
        const element = event.target as Element
        highlight(container, element.textContent)
    }
    
    clearOutput()
    
    const tblContainer = renderTable(container, ranking)
    for (const word of tblContainer.querySelectorAll(`[${tableAttr}]`)) 
        word.addEventListener("click", highlightEvent)

    sendResponse({ command: "select", result: ranking })
}

function clearOutput() {

    document.querySelectorAll(`.${tableClassName}`)
        .forEach(e => e.remove())
}