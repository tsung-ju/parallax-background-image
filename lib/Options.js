import { getCSSBackgroundImage } from './BackgroundImage';
import { insertImg, coverElement } from './Background';
export const defaultOptions = {
    velocityScale: 0.8,
    backgroundImage: getCSSBackgroundImage,
    createBackground: coverElement(insertImg)
};
export function fromPartial(options) {
    return Object.assign({}, defaultOptions, options);
}
