import { getCSSBackgroundImage } from './BackgroundImage';
import { pseudoBefore, CoverElement } from './Background';
export const defaultOptions = {
    velocityScale: 0.8,
    translateX: 0,
    translateY: 0,
    backgroundImage: getCSSBackgroundImage,
    createBackground(el, image, velocityScale) {
        return new CoverElement(pseudoBefore(el, image, velocityScale), el, velocityScale);
    }
};
export function fromPartial(options) {
    return Object.assign({}, defaultOptions, options);
}
