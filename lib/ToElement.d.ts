export declare type ToElement<T extends Element> = string | T;
export declare function toElement<T extends Element>(element: ToElement<T>, parent?: NodeSelector): T;
export declare type ToElementArray<T extends Element> = string | T | T[] | NodeListOf<T>;
export declare function toElementArray<T extends Element>(elements: ToElementArray<T>, parent?: NodeSelector): T[];
