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

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
    return gMeme.selectedLineIdx

}

function addLine() {
    gMeme.lines.push(_creatLine())
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

/* private funcs */
function _creatLine() {
    return {
        txt: 'I Love you',
        size: 40,
        color: '#FFFFFF',
        align: 'center'
    }
}