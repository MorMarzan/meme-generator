'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

/* render and its helper funcs */
function renderMeme() {
    const meme = getMeme()
    setLineCoors(meme)
    const {lines} = meme

    const selectedLine = meme.lines[meme.selectedLineIdx]
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")
    const elColorInput = document.querySelector(".editor .control-panel input[type=color]")

    const elImg = new Image()
    elImg.src = getImgById(meme.selectedImgId).url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            drawText(line, (meme.selectedLineIdx === idx))
        })
        eltxtEditor.value = selectedLine.txt
        elColorInput.value = selectedLine.color
    }
}

// function frameSelected(selectedLine) {
//     // console.log('selectedLine',selectedLine)
//     let { txt, size:h, align, x, y } = selectedLine
//     // const w = gCtx.measureText(txt).width
//     console.log('w from frame', w)
//     switch (align) {
//         case 'right':
//             x = x - (w) / 2
//             break
//         case 'left':
//             x = x + (w) / 2
//     }
//     drawRect(x, y, w + 5, h + 5)
// }

// function handleLines(meme) {
//     const canvasHeight = gElCanvas.height
//     const vertAligns = [canvasHeight * 0.2, canvasHeight * 0.8, canvasHeight / 2]
//     const horAlign = gElCanvas.width / 2
//     const { lines } = meme
//     return lines.map((line, idx) =>
//     ({
//         txt: line.txt,
//         color: line.color,
//         size: line.size,
//         align: line.align,
//         x: horAlign,
//         y: (idx <= 1) ? vertAligns[idx] : vertAligns[vertAligns.length - 1],
//         isSelected: (meme.selectedLineIdx === idx)
//     })
//     )
// }

function setLineCoors(meme) {
    const canvasHeight = gElCanvas.height
    const vertAligns = [canvasHeight * 0.2, canvasHeight * 0.8, canvasHeight / 2]
    const horAlign = gElCanvas.width / 2
    const { lines } = meme
    return lines.forEach((line, idx) => {
        const coor = {
            x: horAlign,
            y: (idx <= 1) ? vertAligns[idx] : vertAligns[vertAligns.length - 1],
        }
        updateLineCoors(idx, coor)
    })
}

/* drawing funcs */
function drawText(line, isSelected) {
    let { txt, color, size, align, x, y } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    if (isSelected) {
        const txtWidth = gCtx.measureText(txt).width
        switch (align) {
            case 'right':
                x = x - (txtWidth) / 2
                break
            case 'left':
                x = x + (txtWidth) / 2
        }
        drawRect(x, y, txtWidth + 5, size + 5)
    }
}

function drawRect(x, y, w, h) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(x - w / 2, y - h / 2, w, h)
}

/* user inputs funcs */
function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()

    const elEditor = document.querySelector(".editor")
    const elGallery = document.querySelector(".gallery")
    elGallery.classList.add("hide")
    elEditor.classList.remove("hide")
}

function onSetLineTxt(newTxt) {
    setLineTxt(newTxt)
    renderMeme()
}

function onSelectLine(ev) {
    // console.log('ev', ev)
    // selectLine(parseInt(lineNum))
    // renderMeme()
}



function onSwitchLine() {
    switchLine()
    renderMeme()
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")
    eltxtEditor.focus()
}

function onAddline() {
    addLine()
    renderMeme()
}

/* user change txt style funcs */
function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetTxtSize(diff) {
    setTxtSize(diff)
    renderMeme()
}

function onSetAlignment(dir) {
    setAlignment(dir)
    renderMeme()
}


/* dowload */
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}