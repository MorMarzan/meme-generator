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

let gImgs = []
let gKewords = ['funny', 'sad', 'animals']
let gFilterBy = ''
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

_createImgs()

function getImgs() {
    if (!gFilterBy) return gImgs
    let imgs = gImgs.filter(img => img.keywords.includes(gFilterBy))

    return imgs
}

function getImgById(imgId) {
    const currImg = gImgs.find(img => imgId === img.id)
    return (currImg) ? currImg : null
}

function setImgFilter(keyword) {
    gFilterBy = keyword.toLowerCase()
}

function getKeywords() {
    return gKewords
}

/* private funcs */
function _createImg(url = 'img/memes/2.jpg', keywords = ['sweet', 'funny']) {
    const radomIdx = getRandomInt(0, gKewords.length)
    return {
        id: makeId(),
        url,
        keywords: [gKewords[radomIdx]]
    }
}

function _createImgs() {
    for (let i = 1; i < 19; i++) {
        gImgs.push(_createImg('img/memes/'+i+'.jpg'))
    }
}