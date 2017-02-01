import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { appendStyleSheet } from './StyleSheet';
export const initialState = {
    scale: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0
};
class StyleBackground {
    constructor(style) {
        this.state = initialState;
        this.style = style;
        Object.assign(style, {
            position: 'absolute',
            left: '0',
            top: '0',
            transformOrigin: '0 0 0',
            pointerEvents: 'none'
        });
    }
    update(patch) {
        Object.assign(this.state, patch);
        this.style.transform = `
            translateX(${this.state.translateX}px)
            translateY(${this.state.translateY}px)
            translateZ(${this.state.translateZ}px)
            scale(${this.state.scale}, ${this.state.scale})`;
    }
}
export const pseudoBefore = (el, image) => {
    const rule = `[${ATTR_PARALLAX_ELEMENT}="${el.getAttribute(ATTR_PARALLAX_ELEMENT)}"]::before {
        content: '';
        width: ${image.naturalWidth}px;
        height: ${image.naturalHeight}px;
        background-image: url(${image.src});
        background-size: 100% 100%;
    }`;
    const index = styleSheet.insertRule(rule, 0);
    return new StyleBackground(styleSheet.cssRules[index].style);
};
export const insertImg = (el, image) => {
    const img = document.createElement('img');
    img.height = image.naturalHeight;
    img.width = image.naturalWidth;
    img.src = image.src;
    el.appendChild(img);
    return new StyleBackground(img.style);
};
const styleSheet = appendStyleSheet();
