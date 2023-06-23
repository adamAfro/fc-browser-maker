import setSelectingMode from "./select"
import CSS from "./styles"




document.head.insertAdjacentHTML("beforeend", `<style>${CSS}</style>`)


declare const browser: any
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.action == "hover") {

        setSelectingMode(request.value)

        const respond = (click: Event) => {

            return sendResponse({ action: "hover", desc: "clicked" })

            
        }

        document.body.addEventListener("click", respond, { once: true })


        return request.value // to keep the connection open if true
    }
})

