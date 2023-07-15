declare const browser: any



async function load(key) {

    const data = await browser.storage.local.get(key)
    if ( !data)
        return undefined
        
    return data[key]
}

async function has(key) {

    const data = await load(key)
    if ( !data)
        return false
        
    return true
}

async function save(key, data) {

    return browser.storage.local.set({ [key]: data})
}






export function loadRanking(tabId: number) {

    return load('ranking' + tabId) as 
        Promise <[string, number][]> | Promise <undefined>
}

export function hasRanking(tabId: number) {

    return has('ranking' + tabId)
}

export function saveRanking(tabId: number, data: [string, number][]) {

    return save('ranking' + tabId, data)
}



export function loadTranslations(tabId: number) {

    return load('translations' + tabId) as 
        Promise <[string, string][]> | Promise <undefined>
}

export function hasTranslations(tabId: number) {

    return has('translations' + tabId)
}

export function saveTranslations(tabId: number, data: [string, number][]) {
 
    return save('translations' + tabId, data)
}



export function loadSetting(name: 'qrfps') {

    return load(name)
}

export function saveSetting(name: 'qrfps', value = undefined) {

    return save(name, value)
}