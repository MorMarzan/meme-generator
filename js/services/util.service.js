'use strict'

function makeId(length = 6) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var id = ''
    
	for (var i = 0; i < length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return id
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}