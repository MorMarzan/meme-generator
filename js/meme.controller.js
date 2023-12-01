'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    resizeCanvas()
    renderMeme()
    
}

/* render and its helper funcs */
function renderMeme() {
    const meme = getMeme()
    setLineCoors(meme)
    const { lines } = meme

    const selectedLine = meme.lines[meme.selectedLineIdx]
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")
    const elColorInputs = document.querySelectorAll(".editor .control-panel input[type=color]")
    const elFontSelect = document.querySelector(".editor .control-panel .fonts")

    const elImg = new Image()
    const imgId = getImgById(meme.selectedImgId)
    elImg.src = (imgId) ? imgId.url : 'img/memes/2.jpg'

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            drawText(line, idx)
            // drawText(line, (meme.selectedLineIdx === idx))
        })
        frameSelected(selectedLine)
        eltxtEditor.value = selectedLine.txt
        elColorInputs[0].value = selectedLine.color
        elColorInputs[1].value = selectedLine.stroke
        elFontSelect.value = selectedLine.font
    }
}

function onImgSelect(imgId) {
    setImg(imgId)
    
    const elEditor = document.querySelector(".editor")
    const elGallery = document.querySelector(".gallery")
    elGallery.classList.add("hide")
    elEditor.classList.remove("hide")
    focusTxtEditor()
    
    resizeCanvas()
    renderMeme()
}

/* canvas helper funcs */
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function setLineCoors(meme) {
    const canvasHeight = gElCanvas.height
    const vertAligns = [canvasHeight * 0.2, canvasHeight * 0.8, canvasHeight / 2]
    const horAlign = gElCanvas.width / 2
    const { lines } = meme
    return lines.forEach((line, idx) => {
        if (!line.x || !line.y) {
            const coor = {
                x: horAlign,
                y: (idx <= 1) ? vertAligns[idx] : vertAligns[vertAligns.length - 1],
            }
            updateLineCoors(idx, coor)
        }
    })
}

/* drawing funcs */
function drawText(line, idx, isSelected = false) {
    const { txt, color, stroke, size, align, font, x, y } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
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

function frameSelected(selectedLine) {
    let { size: h, width: w } = selectedLine
    const pad = 5
    const coor = getTextLeftTopCoor(selectedLine)
    drawRect(coor.x - pad / 2, coor.y - pad / 2, w + pad, h + pad)
}

function drawRect(x, y, w, h) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(x, y, w, h)
    // gCtx.strokeRect(x - w / 2, y - h / 2, w, h)
}

/* txt line handling funcs */
function onSetLineTxt(newTxt) {
    setLineTxt(newTxt)
    renderMeme()
}

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

function onRemoveLine() {
    removeLine()
    renderMeme()
    focusTxtEditor()
}

function onMoveLine(dir) {
    moveLine(dir)
    renderMeme()
}

/* user change txt style funcs */
function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetSrokeColor(color) {
    setStrokeColor(color)
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

function onSetFontFamily(font) {
    console.log('font', font)
    setFontFamily(font)
    renderMeme()
}

/* ux oriented funcs */
function focusTxtEditor() {
    const eltxtEditor = document.querySelector(".editor .control-panel input[type=text]")
    eltxtEditor.focus()
    // console.log('trying to focus')
}

/* track and handle user touch/click on canvas */
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    // window.addEventListener('resize', () => {
    // resizeCanvas()
    //Calc the center of the canvas
    // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //Create the circle in the center
    // createCircle(center)
    // renderMeme()
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
    // console.log('lineClicked', lineClicked)
    if (lineClicked === -1) return

    selectLine(lineClicked)
    renderMeme()
    focusTxtEditor() //not working from here

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

/* share */
function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

/* dowload */
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}



