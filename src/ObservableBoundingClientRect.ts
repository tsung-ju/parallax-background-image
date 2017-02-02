import {observable, transaction, IObservableObject} from 'mobx'

export class ObservableBoundingClientRect implements ClientRect {
    @observable bottom: number;
    @observable height: number;
    @observable left: number;
    @observable right: number;
    @observable top: number;
    @observable width: number;

    constructor (element: HTMLElement) {
        const watch = () => {
            const rect = element.getBoundingClientRect()
            transaction(() => {
                for (let key of ['bottom', 'height', 'left', 'right', 'top', 'width']) {
                    this[key] = rect[key]
                }
            })
            window.requestAnimationFrame(watch)
        }
        watch()
        
    }
}

