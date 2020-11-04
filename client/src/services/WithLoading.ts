import {makeAutoObservable} from 'mobx'

export default class WithLoading {
    private _loading: boolean = false
    constructor() {
        makeAutoObservable(this)
    }

    get isLoading() {
        return this._loading
    }

    loading() {
        this._loading = true
    }

    loaded() {
        this._loading = false
    }
}
