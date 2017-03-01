import {observable, action} from 'mobx'
import {scheduler} from '@ray851107/dom-scheduler'

export interface Rect {
    readonly left: number
    readonly top: number
    readonly width: number
    readonly height: number
}

export class ObservableRect implements Rect {
    @observable left: number = 0
    @observable top: number = 0
    @observable width: number = 0
    @observable height: number = 0

    constructor (element: HTMLElement) {
        const watch = () => {
            this.update(element.getBoundingClientRect())
            scheduler.read(watch)
        }
        scheduler.read(watch)
    }

    @action
    update (rect: ClientRect) {
        this.left = rect.left
        this.top = rect.top
        this.width = rect.width
        this.height = rect.height
    }
}

