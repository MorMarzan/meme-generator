'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
}

/* render and its helper funcs */
function renderMeme() {
    const meme = getMeme()
    setLineCoors(meme)
    const { lines } = meme

    const selectedLine = meme.lines[meme.selectedLineIdx]
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")
    const elColorInput = document.querySelector(".editor .control-panel input[type=color]")

    const elImg = new Image()
    elImg.src = getImgById(meme.selectedImgId).url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            drawText(line, idx)
            // drawText(line, (meme.selectedLineIdx === idx))
        })
        frameSelected(selectedLine)
        eltxtEditor.value = selectedLine.txt
        elColorInput.value = selectedLine.color
    }
}

function frameSelected(selectedLine) {
    let { size: h, width: w } = selectedLine
    const pad = 5
    const coor = getTextLeftTopCoor(selectedLine)
    drawRect(coor.x - pad / 2, coor.y - pad / 2, w + pad, h + pad)
}


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
function drawText(line, idx, isSelected = false) {
    const { txt, color, size, align, x, y } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    setLineWidth(idx, gCtx.measureText(txt).width)

    // if (isSelected) {
    //     const txtWidth = gCtx.measureText(txt).width
    //     switch (align) {
    //         case 'right':
    //             x = x - (txtWidth) / 2
    //             break
    //         case 'left':
    //             x = x + (txtWidth) / 2
    //     }
    //     drawRect(x, y, txtWidth + 5, size + 5)
    // }
}

function drawRect(x, y, w, h) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(x, y, w, h)
    // gCtx.strokeRect(x - w / 2, y - h / 2, w, h)
}

/* user inputs funcs */
function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()

    const elEditor = document.querySelector(".editor")
    const elGallery = document.querySelector(".gallery")
    elGallery.classList.add("hide")
    elEditor.classList.remove("hide")
    focusTxtEditor()
}

function onSetLineTxt(newTxt) {
    setLineTxt(newTxt)
    renderMeme()
}

// function onSelectLine() {
//     selectLine()
//     renderMeme()
//     focusTxtEditor()
// }

function onSwitchLine() {
    switchLine()
    renderMeme()
    focusTxtEditor()
}

function onAddline() {
    addLine()
    renderMeme()
    focusTxtEditor()
}

function focusTxtEditor() {
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")
    eltxtEditor.focus()
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

/* track and handl user touch/click on canvas */

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     //Calc the center of the canvas
    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //     //Create the circle in the center
    //     createCircle(center)
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // console.log('onDown')
    const pos = getEvPos(ev)
    // console.log('pos', pos)
    const lineClicked = getLineClickedIdx(pos)
    console.log('lineClicked', lineClicked)
    if (lineClicked === -1) return

    selectLine(lineClicked)
    renderMeme()
    focusTxtEditor()

    // setCircleDrag(true)
    // //Save the pos we start from
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // console.log('onMove')
    // const { isDrag } = getCircle()
    // if (!isDrag) return
    // console.log('Moving the circle')

    // const pos = getEvPos(ev)
    // // Calc the delta, the diff we moved
    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    // moveCircle(dx, dy)
    // // Save the last pos, we remember where we`ve been and move accordingly
    // gStartPos = pos
    // // The canvas is render again after every move
    // renderCanvas()
}

function onUp() {
    // console.log('onUp')
    // setCircleDrag(false)
    // document.body.style.cursor = 'grab'
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}