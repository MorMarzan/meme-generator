'use strict'

var gImgs = [
    {
        id: '1',
        url: 'img/1.jpg',
        keywords: ['funny', 'politcs']
    },
    {
        id: '2',
        url: 'img/2.jpg',
        keywords: ['sweet', 'dog']
    },
]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgs() {
    return gImgs
}

function getImgById(imgId){
    const currImg = gImgs.find(img => imgId === img.id)
    return (currImg) ? currImg : null
}