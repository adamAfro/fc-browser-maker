import { 
    className as highlight, 
    rankAttrName as highlightingAttr
} from "./highlight"

import {
    tableClassName as table
} from "./table"

import { 
    classNameHover as selectionHover 
} from "./select"

const Styles = {

    [table]: {
        position: `fixed`,
        bottom: `0`,
        zIndex: `1000`,
    },

    [table + ' output']: {
        backgroundColor: `white`,
        cursor: `pointer`
    },

    [selectionHover]: {
        outline: `dashed`,
        cursor: `pointer`
    },

    [highlight]: {
        backgroundColor: `yellow`,
        borderRadius: `0.25em`
    },

    [highlightingAttr]: {
        transition: `background-color 0.5s`
    }
}

function CSSify(obj: any) {

    return Object.entries(obj)
        .map(([key, value]) => `${key.replaceAll(/([a-z])([A-Z])/g, '\$1-\$2').toLowerCase()}: ${value};`)
        .join("\n")
}

const classesCSS = [table, selectionHover, highlight, table + ' output']
    .map(name => `.${name} {${CSSify(Styles[name])}}`).join('\n')
const attributesCSS = `[${highlightingAttr}] { ${CSSify(Styles[highlightingAttr])}}`

export default [classesCSS, attributesCSS].join('\n')