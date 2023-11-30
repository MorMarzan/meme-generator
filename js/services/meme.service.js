'use strict'

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I Love you',
            size: 40,
            color: '#FFFFFF',
            align: 'center'
        },
        {
            txt: 'I Love you more',
            size: 30,
            color: '#FFFFFF',
            align: 'center'
        }
    ]
}

function getMeme() {
    return gMeme
}

function updateLineCoors(idx, coor) {
    gMeme.lines[idx].x = coor.x
    gMeme.lines[idx].y = coor.y
}

function setLineWidth(idx, width) {
    gMeme.lines[idx].width = width
}

/* user inputs funcs */
function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function selectLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
    return gMeme.selectedLineIdx

}

function addLine() {
    gMeme.lines.push(_creatLine())
    gMeme.selectedLineIdx = gMeme.lines.length-1
    // const newLine = _creatLine()
    // gMeme.lines.splice(1, 0, newLine)
}

/* user change txt style funcs */
function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setTxtSize(diff) {
    let memeSize = gMeme.lines[gMeme.selectedLineIdx].size
    if ((memeSize >= 80 && diff > 0) || (memeSize <= 20 && diff < 0)) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setAlignment(dir) {
    gMeme.lines[gMeme.selectedLineIdx].align = dir
}

/* track and handl user touch/click on canvas */
function getLineClickedIdx(clickedPos) {
    const clickedLine = gMeme.lines.findIndex(line => {
        const lineTopCoor = getTextLeftTopCoor(line)
        return clickedPos.x >= lineTopCoor.x && clickedPos.x <= lineTopCoor.x + line.width
            && clickedPos.y >= lineTopCoor.y && clickedPos.y <= lineTopCoor.y + line.size
        // return clickedPos.x >= line.x - line.width/2 && clickedPos.x <= line.x - line.width/2 + line.width
        //     && clickedPos.y >= line.y - line.size/2 && clickedPos.y <= line.y - line.size/2 + line.size
    })
    // return (clickedLine) ? clickedLine : null
    return clickedLine

    // const { pos } = gCircle
    // // Calc the distance between two dots
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // // console.log('distance', distance)
    // //If its smaller then the radius of the circle we are inside
    // return distance <= gCircle.size
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


/* private funcs */
function _creatLine() {
    return {
        txt: 'I Love you',
        size: 40,
        color: '#FFFFFF',
        align: 'center'
    }
}