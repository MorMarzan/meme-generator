'use strict'

function galleryInit() {
    renderGallery()
    renderFilterDatalist()
}

function renderGallery() {
    const imgs = getImgs()
    const elImgConainer = document.querySelector('.imgs-container')

    if (!imgs.length) {
        elImgConainer.innerHTML = "<p>No Image Found</p>"
        return
    }

    const strHtmls = imgs.map(img => `
        <article class="img-preview" onclick="onImgSelect('${img.id}')">
            <img src="${img.url}" alt="${img.keywords[0]} image">
        </article>
    `)
    elImgConainer.innerHTML = strHtmls.join('')
}

function onSetImgFilter(keyword) {
    setImgFilter(keyword)
    renderGallery()
}

function renderFilterDatalist() {
    const keywords = getKeywords()
    const strHtmls = keywords.map(keyword => `
    <option value="${capitalize(keyword)}"></option>
    `)

    document.querySelector("datalist#keywords").innerHTML = strHtmls.join('')
}