import { toAsyncFunction } from './ToFunction';
export function loadBackgroundImage(el, getImage) {
    return toAsyncFunction(getImage)(el).then(loadImage);
}
function loadImage(src) {
    return new Promise(function (resolve, reject) {
        var image = document.createElement('img');
        image.onload = function (event) {
            resolve(event.target);
        };
        image.onerror = function (event) {
            reject(event.error);
        };
        image.src = src;
    });
}
export var getCSSBackgroundImage = function (el) {
    var style = window.getComputedStyle(el);
    return parseCSSUrl(style.backgroundImage);
};
function parseCSSUrl(str) {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1];
}
