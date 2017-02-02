export declare type ToBackgroundImage = string | ((el: Element) => string);
export declare function loadBackgroundImage(el: Element, getImage: ToBackgroundImage): Promise<HTMLImageElement>;
export declare const getCSSBackgroundImage: ToBackgroundImage;
