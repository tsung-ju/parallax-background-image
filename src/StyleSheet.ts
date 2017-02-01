export function appendStyleSheet(): CSSStyleSheet {
    const style = createStyleElement()
    document.head.appendChild(style)
    return style.sheet as CSSStyleSheet
}

export function prependStyleSheet(): CSSStyleSheet {
    const style = createStyleElement()
    document.head.insertBefore(style, document.head.firstElementChild)
    return style.sheet as CSSStyleSheet
}

function createStyleElement (): HTMLStyleElement {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(''))
    return style
}