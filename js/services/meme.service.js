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

function selectLine(lineNum) {
    gMeme.selectedLineIdx = lineNum
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
    return gMeme.selectedLineIdx

}

function addLine() {
    gMeme.lines.push(_creatLine())
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
function isLineClicked(clickedPos) {
    const clickedLine = gMeme.lines.find(line => {
        return clickedPos.x >= line.x && clickedPos.x <= line.x + line.width
            && clickedPos.y >= line.y && clickedPos.y <= line.y + line.size
    })
    return (clickedLine) ? clickedLine : null

    // const { pos } = gCircle
    // // Calc the distance between two dots
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // // console.log('distance', distance)
    // //If its smaller then the radius of the circle we are inside
    // return distance <= gCircle.size
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