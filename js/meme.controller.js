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
    const lines = handleLines(meme)

    const eltxtEditors = document.querySelectorAll(".editor .control-panel input[type=text]")
    const elColorInput = document.querySelector(".editor .control-panel input[type=color]")

    const elImg = new Image()
    elImg.src = getImgById(meme.selectedImgId).url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            drawText(line)
            eltxtEditors[idx].value = line.txt
        })
        elColorInput.value = meme.lines[meme.selectedLineIdx].color
    }
}

function handleLines(meme) {
    const canvasHeight = gElCanvas.height
    const vertAligns = [canvasHeight * 0.2, canvasHeight * 0.8, canvasHeight / 2]
    const horAlign = gElCanvas.width / 2
    const { lines } = meme
    return lines.map((line, idx) =>
    ({
        txt: line.txt,
        color: line.color,
        size: line.size,
        x: horAlign,
        y: (idx <= 1) ? vertAligns[idx] : vertAligns[vertAligns.length - 1],
        isSelected: (meme.selectedLineIdx === idx)
    })
    )
}

/* drawing funcs */
function drawText(lineProp) {
    const { txt, color, size, x, y, isSelected } = lineProp
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    if (isSelected) {
        drawRect(x, y, gCtx.measureText(txt).width + 5, size + 5)
    }
}

function drawRect(x, y, w, h) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(x - w / 2, y - h / 2, w, h)
}

/* user inputs funcs */
function onSetLineTxt(newTxt) {
    setLineTxt(newTxt)
    renderMeme()
}

function onSelectLine(lineNum) {
    selectLine(lineNum)
    renderMeme()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()

    const elEditor = document.querySelector(".editor")
    const elGallery = document.querySelector(".gallery")
    elGallery.classList.add("hide")
    elEditor.classList.remove("hide")
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetTxtSize(diff) {
    setTxtSize(diff)
    renderMeme()
}
/* dowload */
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}