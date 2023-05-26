let hovering = false

browser.browserAction.onClicked.addListener(function(tab) {

    hovering = !hovering
    browser.tabs.sendMessage(tab.id, { action: "hover", value: hovering }, response => hovering = false)
})
