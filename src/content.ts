import { toogle as setSelectingMode, select } from "./components/select"
import { prepare as prepareHighlight } from "./components/highlight"
import { highlight, unhighlight } from "./components/highlight"
import { default as table, countAttrName as tblAttr } from "./components/table"
import { tableClassName } from "./components/table"
import { receive, save } from "./components/browser"

import CSS from "./components/styles"


const styleTag = `<style>${CSS}</style>`
document.head.insertAdjacentHTML("beforeend", styleTag)



receive((message, sender, sendResponse) => {

    if (message.command == "clear")
        return clearOutput()

    if (message.command == "translate") {

        const translations = message.data as [string, string][]

        const selection = document
            .querySelectorAll(`.${tableClassName} output`)

        for (const element of selection as NodeListOf <HTMLOutputElement>) {
            
            const word = element.value.trim().toLowerCase()
            const index = translations.findIndex(([w]) => w.toLowerCase() == word)
        
            if (index < 0 || !translations[index][1])
                continue

            const style = `position:absolute; bottom:${-element.offsetHeight/3}px; left:0;`
            element.insertAdjacentHTML("afterend", `<output style="${style}">${translations[index][1]}</output>`)
        }

        return
    }

    if (message.command == "select") {

        setSelectingMode(true)
        const respond = (event: Event) => render(event, sendResponse)
        document.body
            .addEventListener("click", respond, { once: true })
        
        return true // to keep the bg-script waiting for response
    }
})



async function render(event: Event, sendResponse: (response: any) => void) {

    const container = event.target as Element

    const ranking = select(container)
    setSelectingMode(false)

    prepareHighlight(container, ranking)
    function highlightEvent(event: Event) {

        unhighlight(container)
        
        const element = event.target as Element
        highlight(container, element.textContent)
    }
    
    clearOutput()
    
    const tblContainer = table(container, ranking)
    for (const word of tblContainer.querySelectorAll(`[${tblAttr}]`)) 
        word.addEventListener("click", highlightEvent)

    await save('ranking', ranking)

    sendResponse(true)
}



function clearOutput() {

    document.querySelectorAll(`.${tableClassName}`)
        .forEach(e => e.remove())
}


export default null // ts workaround