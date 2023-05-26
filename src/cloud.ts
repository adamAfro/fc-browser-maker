export default function(words: string[], container: HTMLElement) {

    const ranking = rank(words)

    const html = prerender(ranking).join("")
    container.insertAdjacentHTML("beforeend", html)


    const elements = (Array.from(container.children) as HTMLElement[])
        .filter(child => child.hasAttribute("data-occurences"))
    const rectangles = elements.map(element => new Rectangle(element))
    
    uncrowd(rectangles)
    fit(container, rectangles)

    elements.forEach((element, i) => rerender(element, rectangles[i]))
}

/** Places element with word with calculated position */
function rerender(element: HTMLElement, rectangle: Rectangle) {

    element.style.fontSize = `${rectangle.size}px`
    element.style.left = `${rectangle.left}px`
    element.style.top = `${rectangle.top}px`
    element.style.opacity = `${rectangle.size/64}`
    element.style.zIndex = "1"
}

class Rectangle {

    left: number 
    bottom: number 
    right: number 
    top: number
    size: number
    
    /** Radian angle in which rectangle is repelled */
    direction: number 

    constructor(element: HTMLElement) {
       
        element.textContent.split("")

        this.size = parseFloat(window.getComputedStyle(element).fontSize)

        this.left = 0
        this.bottom = 0
        this.right = element.offsetWidth
        this.top = element.offsetHeight,
        this.direction = Math.random() * 2 * Math.PI
    }
}

/** Calculates scale that will fit rectangles in given size
 * @TODO fails - some words overflow */
function fit(container, rectangles: Rectangle[]) {

    const
        left = Math.min(...rectangles.map(rect => rect.left)),
        right = Math.max(...rectangles.map(rect => rect.right)),
        bottom = Math.min(...rectangles.map(rect => rect.bottom)),
        top = Math.max(...rectangles.map(rect => rect.top))

    const scale = Math.min(container.offsetWidth/(right - left), container.offsetHeight/(top - bottom))

    rectangles.forEach(rect => {
        rect.left -= left
        rect.right -= left
        rect.bottom -= bottom
        rect.top -= bottom

        rect.left *= scale
        rect.right *= scale
        rect.bottom *= scale
        rect.top *= scale
        rect.size *= scale
    })
    
    return scale
}

/** Simulate pushing force to crowded rectangles
 * @TODO is not optimal - for large text large time */
function uncrowd(rectangles: Rectangle[]) {

    for (let v = 0; v < 100; v++) rectangles.forEach(stinker => {
        
        const sniffers = rectangles
            .filter(sniffer => sniffer !== stinker && intersection([sniffer, stinker]))
            
        sniffers.forEach(sniffer => repel(sniffer, stinker, v))
    })
}

/** Simulate pushing one rectangle from another 
 * @TODO is not optimal */
function repel(sniffer: Rectangle, stinker: Rectangle, variation:number) {

    const moveX = Math.cos(sniffer.direction + stinker.direction + variation) * 10
    const moveY = Math.sin(sniffer.direction + stinker.direction + variation) * 10
    
    sniffer.left += moveX
    sniffer.right += moveX
    sniffer.top += moveY
    sniffer.bottom += moveY
}

/** Check if given rectangles have intersecting area */
function intersection(rects: [Rectangle, Rectangle]) {
    
    return !(
        
        // A is on the left side of B
        rects[0].right < rects[1].left ||

        // A is on the right side
        rects[0].left > rects[1].right ||

        // A is under B
        rects[0].top < rects[1].bottom ||

        // A is over B
        rects[0].bottom > rects[1].top
    )
}
 
/** HTML that contains hidden elements that are rendered, so other function can displace them well */
function prerender(counted: [string, number][], max = Math.max(...counted.map(([w, n]) => n))) {

    return counted.map(([word, n]) => `<output data-occurences="${n}"
        style="font-size:${n/max}em;opacity:0;position:absolute;z-index:-1000">${word}
    </output>`.replaceAll(/\s+/g, " "))
}

/** Map elements and their counts to map */
function count(array: any[]) {

    const counts: Map<any, number> = new Map()
    array.forEach(element => counts.has(element) ? 
        counts.set(element, counts.get(element) + 1) : 
        counts.set(element, 1)
    )

    return counts
}

/** Count words and order them by amount of occurences */
function rank(words: string[]) {

    const counted = [...count(words).entries()]
        .sort(( [w1, n1], [w2, n2] ) => n2 - n1)

    return counted
}