import { ToAsyncFunction } from './ToFunction';
export declare type ToBackgroundImage = ToAsyncFunction<[Element], string>;
export declare function loadBackgroundImage(el: Element, getImage: ToBackgroundImage): Promise<HTMLImageElement>;
export declare const getCSSBackgroundImage: ToBackgroundImage;
