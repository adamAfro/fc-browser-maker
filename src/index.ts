import selection from "./select"
import CSS from "./styles"




document.head.insertAdjacentHTML("beforeend", `<style>${CSS}</style>`)


declare const browser: any
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.action == "hover")
        selection(request.value)
})

