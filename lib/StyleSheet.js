export function appendStyleSheet() {
    const style = createStyleElement();
    document.head.appendChild(style);
    return style.sheet;
}
export function prependStyleSheet() {
    const style = createStyleElement();
    document.head.insertBefore(style, document.head.firstElementChild);
    return style.sheet;
}
function createStyleElement() {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    return style;
}
