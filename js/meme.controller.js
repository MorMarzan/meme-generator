'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    const canvasWidthCenter = gElCanvas.width / 2
    const canvas20PerTop = gElCanvas.height * 0.2
    const currMeme = getMeme()
    const currMemeTxt = currMeme.lines[0].txt
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")

    const elImg = new Image()
    elImg.src = '/img/2.jpg'

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(currMemeTxt, canvasWidthCenter, canvas20PerTop)
        eltxtEditor.value = currMemeTxt
    }

}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetLineTxt(newTxt) {
    setLineTxt(newTxt)
    renderMeme()
}

function onImgSelect(imgId) {
    console.log(imgId)
}