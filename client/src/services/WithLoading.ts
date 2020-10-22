import {computed, observable} from 'mobx'

export default class WithLoading {
    constructor(
        private _loading= observable.box(true)
    ) {
    }

    @computed get isLoading() {
        return this._loading.get()
    }

    loading() {
        this._loading.set(true)
    }

    loaded() {
        this._loading.set(false)
    }
}