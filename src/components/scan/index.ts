import makeQRCode from "./qrcode"
import { loadSetting } from "../storage"

/** Make animation of scannable SVG immages of data */
export function AnimateArrayData(data: any[], dim: number) {

    const chunks = chunkCSVArray(data)
    const matrices = [] as SVGElement[]
    for (const chunk of chunks) {

        const matrix = makeQRCode({
            msg: JSON.stringify(chunk), dim
        })

        matrix.style.display = "none"
        
        matrix.dataset.index = chunk.index.toString()
        matrix.dataset.total = chunk.total.toString()

        matrices.push(matrix)
    }

    return matrices
}

export function startMatricesAnimation(matrices: SVGElement[], fpsInput) {

    matrices[0].style.display = ""

    let i = 0; const n = matrices.length
    function changeFrame() {
    
        matrices[i].style.display = "none"
        i = (i + 1) % n
        matrices[i].style.display = ""

        setTimeout(changeFrame, parseInt(fpsInput.value))
    }

    setTimeout(changeFrame, parseInt(fpsInput.value))
}

function chunkCSVArray(data: any[], chunkMaxLength = 256) {

    const chunks = [{data: data[0].join(','), index: 0, total: NaN}]
    chunkMaxLength -= JSON.stringify(chunks[0]).length
    for (let i = 1, j = 0; i < data.length; i++) {

        const csvRow = data[i].join(',')
        if (csvRow.length > chunkMaxLength)
            throw new Error(`Chunk length ${csvRow.length} exceeds maximum ${chunkMaxLength}`)

        if (chunks[j].data.length + csvRow.length <= chunkMaxLength) 
            chunks[j].data += '\n' + csvRow
        else {
            
            j++

            chunks.push({data: csvRow, index: j, total: NaN})
        }
    }

    for (const chunk of chunks)
        chunk.total = chunks.length

    return chunks
}