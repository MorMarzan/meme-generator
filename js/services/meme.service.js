'use strict'

const STORAGE_KEY = 'memeDB'
let gCanvasSize
let gMeme
let gMems 

// let gMeme = {
//     selectedImgId: 2,
//     selectedItemType: 'lines',
//     selectedLineIdx: 0,
//     selectedStickerIdx: 0,
//     isDrag: false,
//     lines: [
//         {
//             txt: 'I Love you',
//             size: 40,
//             color: '#FFFFFF',
//             stroke: '#000000',
//             align: 'center',
//             font: 'Impact',
//         },
//         {
//             txt: 'I Love you more',
//             size: 30,
//             color: '#FFFFFF',
//             stroke: '#000000',
//             align: 'center',
//             font: 'Impact'
//         }
//     ],
//     stickers: [
//         // {
//         //     url: 'img/stickers/angry.svg',
//         //     size: 40,
//         //     x: 0,
//         //     y: 0
//         // },
//         // {
//         //     url: 'img/stickers/sad.svg',
//         //     size: 40,
//         //     x: 50,
//         //     y: 0
//         // }
//     ]
// }


_createMeme()
// _createMemes()

function restartMeme() {
    _createMeme()
    // gMeme = gMems[0]
}

function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function saveCanvasSize(size) {
    // {w: gElCanvas.width, h: gElCanvas.height}
    gCanvasSize = size
}

function setInitialLinesCoor() {
    const horCenter = gCanvasSize.w / 2
    const vertAligns = [gCanvasSize.h * 0.2, gCanvasSize.h * 0.8, gCanvasSize.h / 2]
    gMeme.lines.forEach((line, idx) => {
        line.x = horCenter
        line.y = (idx <= 1) ? vertAligns[idx] : vertAligns[vertAligns.length - 1]
    })
}

/* txt line handling funcs */
function setLineTxt(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
    // selectLine(gMeme.selectedLineIdx)
}

function selectLine(lineIdx = gMeme.selectedLineIdx) {
    gMeme.selectedLineIdx = lineIdx
    gMeme.selectedItemType = 'lines'
}

function switchLine() {
    if (gMeme.selectedItemType === 'stickers') selectLine()
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
    return gMeme.selectedLineIdx

}

function addLine() {
    gMeme.lines.push(_createLine())
    const newLineIdx = gMeme.lines.length - 1
    gMeme.selectedLineIdx = gMeme.lines.length - 1

    selectLine(newLineIdx)
    // const newLine = _createLine()
    // gMeme.lines.splice(1, 0, newLine)
}

/* txt line style change funcs */
function setColor(color) {
    if (gMeme.selectedItemType === 'stickers') {
        console.log('Avialable for text only')
        return
    }
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setStrokeColor(color) {
    if (gMeme.selectedItemType === 'stickers') {
        console.log('Avialable for text only')
        return
    }
    gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

function setFontFamily(font) {
    if (gMeme.selectedItemType === 'stickers') {
        console.log('Avialable for text only')
        return
    }
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

/* sticker&lines mult handling funcs */
function removeItem() {
    //of sticker is focused
    if (gMeme.selectedItemType === 'stickers') {
        gMeme.stickers.splice(gMeme.selectedStickerIdx, 1)
        if (gMeme.stickers.length) gMeme.selectedStickerIdx = 0
        else selectLine()
        return
    }
    //if line is focused:
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function setItemSize(diff) {
    //of sticker is focused
    if (gMeme.selectedItemType === 'stickers') {
        let stickerSize = gMeme.stickers[gMeme.selectedStickerIdx].size
        if ((stickerSize >= 65 && diff > 0) || (stickerSize <= 20 && diff < 0)) return //65 limit because of the original img size
        gMeme.stickers[gMeme.selectedStickerIdx].size += diff
        return
    }
    //if line is focused:
    let memeSize = gMeme.lines[gMeme.selectedLineIdx].size
    if ((memeSize >= 80 && diff > 0) || (memeSize <= 20 && diff < 0)) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff

}

// function setAlignment(dir) {
//     if (gMeme.selectedItemType === 'stickers') {
//         const selectedSticker = gMeme.stickers[gMeme.selectedStickerIdx]
//         //dir counter intuitive becuse the way canvas align txt
//         switch (dir) {
//             case 'left':
//                 selectedSticker.x = gCanvasSize.w - selectedSticker.size
//                 break;
//             case 'right':
//                 selectedSticker.x = 0
//                 break;
//             default:
//                 selectedSticker.x = (gCanvasSize.w - selectedSticker.size) / 2
//         }
//         return
//     }
//     gMeme.lines[gMeme.selectedLineIdx].align = dir
// }

function setItemAlignment(dir) {
    const selectedIdx = (gMeme.selectedItemType === 'stickers') ? gMeme.selectedStickerIdx : gMeme.selectedLineIdx
    const selectedItem = gMeme[gMeme.selectedItemType][selectedIdx]

    if (gMeme.selectedItemType === 'stickers') {
        switch (dir) {
            case 'left':
                selectedItem.x = gCanvasSize.w - selectedItem.size
                break;
            case 'right':
                selectedItem.x = 0
                break;
            default:
                selectedItem.x = (gCanvasSize.w - selectedItem.size) / 2
        }
        return
    }

    switch (dir) {
        case 'left':
            selectedItem.x = gCanvasSize.w - selectedItem.width / 2
            break;
        case 'right':
            selectedItem.x = selectedItem.width / 2
            break;
        default:
            selectedItem.x = gCanvasSize.w / 2
    }
}

/* sticker handling funcs */
function addSticker(stickerUrl) {
    gMeme.stickers.push(_createSticker(stickerUrl))
    const newStickerIdx = gMeme.stickers.length - 1
    gMeme.selectedStickerIdx = newStickerIdx

    selectSticker(newStickerIdx)
    // setSticker(stickerId)
}

function selectSticker(stickerIdx) {
    gMeme.selectedStickerIdx = stickerIdx
    gMeme.selectedItemType = 'stickers'
}

/* track and handle elements place on canvas */
function getItemClicked(clickedPos) {
    const clickedLineIdx = gMeme.lines.findIndex(line => {
        const lineTopCoor = getTextLeftTopCoor(line)
        return clickedPos.x >= lineTopCoor.x && clickedPos.x <= lineTopCoor.x + line.width
            && clickedPos.y >= lineTopCoor.y && clickedPos.y <= lineTopCoor.y + line.size
    })

    if (clickedLineIdx !== -1) return ({ type: 'line', idx: clickedLineIdx })

    const clickedStickerIdx = gMeme.stickers.findIndex(sticker => {
        return clickedPos.x >= sticker.x && clickedPos.x <= sticker.x + sticker.size
            && clickedPos.y >= sticker.y && clickedPos.y <= sticker.y + sticker.size
    })

    if (clickedStickerIdx !== -1) return ({ type: 'sticker', idx: clickedStickerIdx })

    return ({ type: '', idx: -1 })

}

function getTextLeftTopCoor(line) {
    let { size: h, width: w, align, x, y } = line
    switch (align) {
        case 'right':
            x = x - (w) / 2
            break
        case 'left':
            x = x + (w) / 2
    }
    return { x: x - w / 2, y: y - h / 2 }
}

function setLineWidth(idx, width) {
    gMeme.lines[idx].width = width
}

function setDrag(isDrag) {
    gMeme.isDrag = isDrag
}

function moveItem(dx, dy) {
    const selected = (gMeme.selectedItemType === 'stickers') ? gMeme.stickers[gMeme.selectedStickerIdx] : gMeme.lines[gMeme.selectedLineIdx]
    selected.y += dy
    selected.x += dx
}

/* private funcs */
function _createLine() {
    return {
        txt: 'Your text here',
        size: 40,
        color: '#FFFFFF',
        stroke: '#000000',
        align: 'center',
        font: 'Impact',
        x: gCanvasSize.w / 2,
        y: gCanvasSize.h / 2
    }
}

function _createSticker(url) {
    return {
        url,
        size: 40,
        x: gCanvasSize.w / 2 - 20,
        y: gCanvasSize.h / 2 - 20
    }
}

function _createMeme() {
    gMeme = {
        selectedImgId: 2,
        selectedItemType: 'lines',
        selectedLineIdx: 0,
        selectedStickerIdx: 0,
        isDrag: false,
        lines: [
            {
                txt: 'I Love you',
                size: 40,
                color: '#FFFFFF',
                stroke: '#000000',
                align: 'center',
                font: 'Impact',
            },
            {
                txt: 'I Love you more',
                size: 30,
                color: '#FFFFFF',
                stroke: '#000000',
                align: 'center',
                font: 'Impact'
            }
        ],
        stickers: []
    }
}

function _createMemes() {
    gMems = loadFromStorage(STORAGE_KEY)
    if (gMems && gMems.length) {
        gMeme = gMems[0]
        return
    }
    
    // If no memes in storage - generate demo data
    
    _createMeme()
    const defaultMemeDeepCopy = JSON.parse(JSON.stringify(gMeme))
    // gMems.push(gMeme)
    gMems = [defaultMemeDeepCopy]

    _saveMemesToStorage()
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMems)
}

function saveMeme() {
    const memeDeepCopy = JSON.parse(JSON.stringify(gMeme))
    gMems.push(memeDeepCopy)
    _saveMemesToStorage()
}
