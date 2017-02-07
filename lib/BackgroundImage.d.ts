import { ToAsyncFunction1 } from './ToFunction';
export declare type ToBackgroundImage = ToAsyncFunction1<Element, string>;
export declare function loadBackgroundImage(el: Element, getImage: ToBackgroundImage): Promise<HTMLImageElement>;
export declare const getCSSBackgroundImage: ToBackgroundImage;
