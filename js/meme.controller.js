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
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")
    const elColorInput = document.querySelector(".editor .control-panel input[type=color]")
    
    const currMemeOpt = {
        txt: currMeme.lines[currMeme.selectedLineIdx].txt,
        color: currMeme.lines[currMeme.selectedLineIdx].color,
        size: currMeme.lines[currMeme.selectedLineIdx].size
    }

    const elImg = new Image()
    elImg.src = currUrl

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(currMemeOpt, canvasWidthCenter, canvas20PerTop)
        eltxtEditor.value = currMemeOpt.txt
        elColorInput.value = currMemeOpt.color
    }
}

function drawText(memeOpt, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = memeOpt.color
    gCtx.font = `${memeOpt.size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(memeOpt.txt, x, y)
    gCtx.strokeText(memeOpt.txt, x, y)
}

/* user inputs funcs */
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