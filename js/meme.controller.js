'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}
/* render and its helper funcs */
function renderMeme() {
    const canvasWidthCenter = gElCanvas.width / 2
    const canvas20PerTop = gElCanvas.height * 0.2
    const currMeme = getMeme()
    const currUrl = getImgById(currMeme.selectedImgId).url
    const currMemeTxt = currMeme.lines[currMeme.selectedLineIdx].txt
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")

    const elImg = new Image()
    elImg.src = currUrl

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
    // console.log(imgId)
    setImg(imgId)
    renderMeme()

    const elEditor = document.querySelector(".editor")
    const elGallery = document.querySelector(".gallery")
    elGallery.hidden = true;
    elEditor.hidden = false;
}

/* dowload */
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}