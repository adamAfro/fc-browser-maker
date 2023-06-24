import { 
    className as highlight, 
    rankAttrName as highlightingAttr
} from "./highlight"

import { 
    classNameHover as selectionHover 
} from "./select"

const Styles = {

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

export default `
    .${selectionHover} { ${CSSify(Styles[selectionHover])} }
    .${highlight} { ${CSSify(Styles[highlight])}}
    [${highlightingAttr}] { ${CSSify(Styles[highlightingAttr])}}
`