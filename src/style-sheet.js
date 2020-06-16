export function appendStyleSheet(content = '') {
  const style = createStyleElement(content)
  document.head.appendChild(style)
  return style.sheet
}

export function prependStyleSheet(content = '') {
  const style = createStyleElement(content)
  document.head.insertBefore(style, document.head.firstElementChild)
  return style.sheet
}

function createStyleElement(content) {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(content))
  return style
}
