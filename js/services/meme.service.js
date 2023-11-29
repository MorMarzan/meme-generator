'use strict'

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I Love you',
            size: 20,
            color: 'red'
        }
    ]
}

function getMeme(memeId) {
    return gMeme
}

function setLineTxt(newTxt) {
    gMeme.lines[0].txt = newTxt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}
