export function appendStyleSheet() {
    var style = createStyleElement();
    document.head.appendChild(style);
    return style.sheet;
}
export function prependStyleSheet() {
    var style = createStyleElement();
    document.head.insertBefore(style, document.head.firstElementChild);
    return style.sheet;
}
function createStyleElement() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    return style;
}
