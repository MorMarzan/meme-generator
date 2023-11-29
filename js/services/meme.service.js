'use strict'

var gImgs = [
    { 
        id: 1, 
        url: 'img/2.jpg', 
        keywords: ['sweet', 'dog'] 
    },
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I Love you',
            size: 20,
            color: 'red'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme(memeId) {
    return gMeme
}

function setLineTxt(newTxt) {
    gMeme.lines[0].txt = newTxt
}