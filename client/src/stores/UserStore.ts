import {makeAutoObservable} from 'mobx'
import {IUserResponse} from '../apis/Users'

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }
    user: IUserResponse = {name: '', tag: '', email: '', bio: '', isCreator: false}
    isLoggedIn: boolean = false
}

const userStore = new UserStore()

export default userStore