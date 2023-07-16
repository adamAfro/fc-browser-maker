import { receive, sendToBackground } from "./components/browser"

import { prepare as prepareHighlight } 
    from "./components/highlight"

import { highlight, unhighlight } 
    from "./components/highlight"

import { select, toogle as setSelectingMode } 
    from "./components/select"

import { mark } from "./components/keys"

import CSS from "./components/styles"



const styleTag = `<style>${CSS}</style>`
document.head.insertAdjacentHTML("beforeend", styleTag)



receive((message, _, sendResponse) => {

    if (message.command == "select") 
        return handleSelecting()

    if (message.command == "highlight")
        return handleHighlight(message.data)

    if (message.command == 'check') {

        if (message.title == 'selection') {

            sendResponse(checkSelection())
            
            return true
        }
    }
        
})




function handleSelecting() {

    setSelectingMode(true)
    document.body
        .addEventListener("click", handleSelection, { once: true })
    
    return true // to keep the bg-script waiting for response
}



let container: Element | null = null
function handleSelection(event: Event) {

    container = event.target as Element

    const ranking = select(container)
    setSelectingMode(false)

    prepareHighlight(container, ranking)
    markSelecion(container as HTMLElement)
    
    return sendToBackground({ 
        command: 'take',
        title: 'ranking',
        data: ranking
    })
}



function markSelecion(container: HTMLElement) {

    container.dataset[mark] = 'true'
}

function checkSelection() {

    if (document.querySelector(`[data-${mark}]`))
        return true

    return false
}



function handleHighlight(word: string) {

    unhighlight(container)
    highlight(container, word)
}


export default null // ts workaround