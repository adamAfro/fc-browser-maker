import { receive, sendToBackground } from "./components/browser"

import { prepare as prepareHighlight } 
    from "./components/highlight"

import { highlight, unhighlight } 
    from "./components/highlight"

import { toogle as setSelectingMode, select, Selection } 
    from "./components/select"

import CSS from "./components/styles"



const styleTag = `<style>${CSS}</style>`
document.head.insertAdjacentHTML("beforeend", styleTag)



receive((message, _, sendResponse) => {

    if (message.command == "select") {

        setSelectingMode(true)
        document.body
            .addEventListener("click", handleSelecting, { once: true })
    
        return
    }

    if (message.command == "highlight")
        return handleHighlight(message.data)

    if (message.command == 'reset') {
        Selection.unmark()
        unhighlight(document.body)
    }
        

    if (message.command == 'check') {

        if (message.title == 'selection') {

            sendResponse(Selection.check())
            
            return true
        }
    }
})



function handleSelecting(event: Event) {

    const element = event.target as Element
    const ranking = select(element)
    if ( !ranking)
        return

    prepareHighlight(element, ranking)
    
    return sendToBackground({ 
        command: 'take',
        title: 'ranking',
        data: ranking
    })
}



function handleHighlight(word: string) {

    const container = Selection.get()
    if ( !container)
        return
    
    unhighlight(container)
    highlight(container, word)
}


export default null // ts workaround