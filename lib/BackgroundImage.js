import { toAsyncFunction } from './ToFunction';
export function loadBackgroundImage(el, getImage) {
    return toAsyncFunction(getImage)(el).then(loadImage);
}
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img');
        image.onload = (event) => {
            resolve(event.target);
        };
        image.onerror = (event) => {
            reject(event.error);
        };
        image.src = src;
    });
}
export const getCSSBackgroundImage = (el) => {
    const style = window.getComputedStyle(el);
    return parseCSSUrl(style.backgroundImage);
};
function parseCSSUrl(str) {
    return str.match(/url\(['"]?(.*?)['"]?\)/)[1];
}
