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

async function remove(key) {

    return browser.storage.local.remove(key)
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

export function resetRanking(tabId: number) {

    return remove('ranking' + tabId)
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

export function resetTranslations(tabId: number) {

    return remove('translations' + tabId)
}

export async function resetData() {

    const keys = await browser.storage.local
        .get(null, (items) => Object.keys(items))
    if ( !keys)
        return

    const keysToRemove = keys
        .filter(key => key.startsWith('ranking') || key.startsWith('translations'))

    return browser.storage.local.remove(keysToRemove)
}


export function loadSetting(name: 'qrfps') {

    return load(name)
}

export function saveSetting(name: 'qrfps', value = undefined) {

    return save(name, value)
}