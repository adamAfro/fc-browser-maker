import CSS from "./styles"
document.head.insertAdjacentHTML("beforeend", `<style>${CSS}</style>`)


import { toogle as setSelectingMode, select } from "./select"


import { prepare as prepareHighlight, highlight, unhighlight } from "./highlight"
import { default as renderTable, countAttrName as tableAttr } from "./table"

declare const browser: any
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.command == "select") {

        setSelectingMode(true)
        document.body.addEventListener("click", (event: Event) => {

            const container = event.target as Element

            const ranking = select(event.target)
            setSelectingMode(false)

            prepareHighlight(container, ranking)
            function highlightEvent(event: Event) {

                unhighlight(container)
                
                const element = event.target as Element
                highlight(container, element.textContent)
            }
            
            const tblContainer = renderTable(container, ranking)
            for (const word of tblContainer.querySelectorAll(`[${tableAttr}]`)) 
                word.addEventListener("click", highlightEvent)

            sendResponse({ command: "select" })

        }, { once: true })
        
        return true // to keep the bg-script waiting for response
    }
})
