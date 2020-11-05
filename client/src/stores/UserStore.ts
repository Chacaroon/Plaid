import {makeAutoObservable} from 'mobx'

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }
    isLoggedIn: boolean = false
    isCreator: boolean = false
}

const userStore = new UserStore()

export default userStore
