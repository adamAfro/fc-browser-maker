import { className as highlight, 
    rankAttrName as highlightingAttr } from "../highlight"

import { tableClassName as table } from "../table"
import { classNameHover as selectionHover } from "../select"

import style from './style.css'

export default style
    .replaceAll('.highlight', '.' + highlight)
    .replaceAll('.table', '.' + table)
    .replaceAll('.selectionHover', '.' + selectionHover)
    .replaceAll('[highlightingAttr]', `[${highlightingAttr}]`)
