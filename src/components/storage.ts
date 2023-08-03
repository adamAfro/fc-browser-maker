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






export function loadRanking() {

    return load('ranking') as 
        Promise <[string, number][]> | Promise <undefined>
}

export function hasRanking() {

    return has('ranking')
}

export function saveRanking(data: [string, number][]) {

    return save('ranking', data)
}

export function resetRanking() {

    return remove('ranking')
}



export function loadTranslations() {

    return load('translations') as 
        Promise <[string, string][]> | Promise <undefined>
}

export function hasTranslations() {

    return has('translations')
}

export function saveTranslations(data: [string, number][]) {
 
    return save('translations', data)
}

export function resetTranslations() {

    return remove('translations')
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


type SettingName = 'qrfps' | 'width' | 'height'
export function loadSetting(name: SettingName) {

    return load(name)
}

export function saveSetting(name: SettingName, value = undefined) {

    return save(name, value)
}