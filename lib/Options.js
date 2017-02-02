import { getCSSBackgroundImage } from './BackgroundImage';
import { pseudoBefore, coverElement } from './Background';
export const defaultOptions = {
    velocityScale: 0.8,
    translateX: 0,
    translateY: 0,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(pseudoBefore)
};
export function fromPartial(options) {
    return Object.assign({}, defaultOptions, options);
}
