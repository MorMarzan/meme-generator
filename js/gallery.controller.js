'use strict'
renderGallery()

function renderGallery() {
    const imgs = getImgs()
    const strHtmls = imgs.map(img => `
        <article class="img-preview" onclick="onImgSelect('${img.id}')">
            <img src="${img.url}" alt="${img.keywords[0]} image">
        </article>
    `)
    document.querySelector('.imgs-container').innerHTML = strHtmls.join('')
}