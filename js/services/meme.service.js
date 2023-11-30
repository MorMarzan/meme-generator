'use strict'

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I Love you',
            size: 40,
            color: '#FFFFFF'
        },
        {
            txt: 'I Love you more',
            size: 30,
            color: '#FFFFFF'
        }
    ]
}

function getMeme() {
    return gMeme
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
    // console.log('gMeme.selectedLineIdx',gMeme.selectedLineIdx)
    // console.log('srvice active', lineNum)
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setTxtSize(diff) {
    let memeSize = gMeme.lines[gMeme.selectedLineIdx].size
    if ((memeSize >= 80 && diff > 0) || (memeSize <= 20 && diff < 0)) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function addLine() {
    gMeme.lines.push(_creatLine())
}

/* private funcs */
function _creatLine() {
    return {
        txt: 'I Love you',
        size: 40,
        color: '#FFFFFF'
    }
}