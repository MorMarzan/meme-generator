'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}
/* render and its helper funcs */
//needs optimization!!
function renderMeme() {
    const canvasWidthCenter = gElCanvas.width / 2
    const canvas20PerTop = gElCanvas.height * 0.2
    const canvas80PerTop = gElCanvas.height * 0.8
    const currMeme = getMeme()
    
    const currUrl = getImgById(currMeme.selectedImgId).url
    const eltxtEditors = document.querySelectorAll(".editor .control-panel input[type=text]")
    const elColorInput = document.querySelector(".editor .control-panel input[type=color]")
    
    const currMemeOpt = {
        txt: currMeme.lines[0].txt,
        color: currMeme.lines[0].color,
        size: currMeme.lines[0].size,
        x: canvasWidthCenter,
        y: canvas20PerTop,
        isSelected: (currMeme.selectedLineIdx === 0)
    }
    const currMemeOpt1 = {
        txt: currMeme.lines[1].txt,
        color: currMeme.lines[1].color,
        size: currMeme.lines[1].size,
        x: canvasWidthCenter,
        y: canvas80PerTop,
        isSelected: (currMeme.selectedLineIdx === 1)
    }

    const elImg = new Image()
    elImg.src = currUrl

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(currMemeOpt)
        drawText(currMemeOpt1)
        eltxtEditors[0].value = currMemeOpt.txt
        eltxtEditors[1].value = currMemeOpt1.txt
        elColorInput.value = currMemeOpt.color
    }
}

function drawText(memeOpt) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = memeOpt.color
    gCtx.font = `${memeOpt.size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(memeOpt.txt, memeOpt.x, memeOpt.y)
    gCtx.strokeText(memeOpt.txt, memeOpt.x, memeOpt.y)

    if (memeOpt.isSelected) {
        drawRect(memeOpt.x, memeOpt.y, gCtx.measureText(memeOpt.txt).width + 5, memeOpt.size + 5)
    }
}

function drawRect(x, y, w, h) {
    gCtx.beginPath()
    gCtx.lineWidth = 1

    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(x-w/2, y-h/2, w, h)
    // gCtx.rect(x, y, 120, 120)
    // gCtx.stroke()
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