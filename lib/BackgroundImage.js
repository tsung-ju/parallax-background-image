export function loadBackgroundImage(el, getImage) {
    if (typeof getImage === 'string') {
        return loadImage(getImage);
    }
    return loadImage(getImage(el));
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
