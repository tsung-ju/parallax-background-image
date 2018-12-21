import { ToElement, ToElementArray } from './ToElement';
import { Options } from './Options';
import { Viewport } from './Viewport';
import { coverElement } from './Background';
export declare class Parallax {
    static getCSSBackgroundImage: import("./ToFunction").ToFunction<[Element], string | Promise<string>>;
    static pesudoBefore: import("./Background").CreateBackground;
    static insertImg: import("./Background").CreateBackground;
    static coverElement: typeof coverElement;
    viewport: Viewport;
    useFallback: boolean;
    constructor(element: ToElement<HTMLElement>, useFallback?: boolean, perspective?: number);
    add(elements: ToElementArray<HTMLElement>, partial?: Partial<Options>): Promise<void>[];
    addElement(element: HTMLElement, options: Options): Promise<void>;
}
