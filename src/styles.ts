import { selector } from "./keys"

const Styles = {

    selected: {
        outline: `dashed`,
        cursor: `pointer`
    }
}

function CSSify(obj: any) {

    return Object.entries(obj)
        .map(([key, value]) => `${key.replaceAll(/([a-z])([A-Z])/g, '\$1-\$2').toLowerCase()}: ${value};`)
        .join("\n")
}

export default `.${selector} { ${CSSify(Styles.selected)} }`