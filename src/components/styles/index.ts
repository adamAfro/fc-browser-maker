import { className as highlight, 
    rankAttrName as highlightingAttr } from "../highlight"

import { classNameHover as selectionHover } from "../select"

import style from './style.css'

export default style
    .replaceAll('.highlight', '.' + highlight)
    .replaceAll('.selectionHover', '.' + selectionHover)
    .replaceAll('[highlightingAttr]', `[${highlightingAttr}]`)
