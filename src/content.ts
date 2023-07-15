import CSS from "./components/styles"

const styleTag = `<style>${CSS}</style>`
document.head.insertAdjacentHTML("beforeend", styleTag)



import { receive } from "./components/browser"

receive(message => {

    if (message.command == "select") 
        handleSelecting()

    if (message.command == "highlight")
        handleHighlight(message.data) 
})



import { toogle as setSelectingMode } from "./components/select"

function handleSelecting() {

    setSelectingMode(true)
    document.body
        .addEventListener("click", handleSelection, { once: true })
    
    return true // to keep the bg-script waiting for response
}



import { sendToBackground } from "./components/browser"
import { select } from "./components/select"

let container: Element | null = null
function handleSelection(event: Event) {

    container = event.target as Element

    const ranking = select(container)
    setSelectingMode(false)

    prepareHighlight(container, ranking)
    
    return sendToBackground({ 
        command: 'take',
        title: 'ranking',
        data: ranking
    })
}

import { prepare as prepareHighlight } from "./components/highlight"
import { highlight, unhighlight } from "./components/highlight"

function handleHighlight(word: string) {

    unhighlight(container)
    highlight(container, word)
}


export default null // ts workaround