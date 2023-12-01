'use strict'

// var gImgs = [
//     {
//         id: '1',
//         url: 'img/1.jpg',
//         keywords: ['funny', 'politcs']
//     },
//     {
//         id: '2',
//         url: 'img/2.jpg',
//         keywords: ['sweet', 'dog']
//     },
// ]

// let gStickers = [
//     {
//         id: '1',
//         url: 'img/stickers/angry.svg'
//     }
// ]

let gImgs = []

_createImgs()

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getImgs() {
    return gImgs
}

function getImgById(imgId) {
    const currImg = gImgs.find(img => imgId === img.id)
    return (currImg) ? currImg : null
}

// function getStickerById(stickerId) {
//     const currSticker = gStickers.find(sticker => stickerId === sticker.id)
//     return (currSticker) ? currSticker : null
// }

/* private funcs */
function _createImg(url = 'img/memes/2.jpg', keywords = ['sweet', 'funny']) {
    return {
        id: makeId(),
        url,
        keywords
    }
}

function _createImgs() {
    for (let i = 1; i < 19; i++) {
        gImgs.push(_createImg('img/memes/'+i+'.jpg'))
    }
}