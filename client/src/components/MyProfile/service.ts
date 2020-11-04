import React from 'react'
import {action, observable} from 'mobx'
import {IUserProfileResponse, getProfile} from '../../apis/Users'
import userStore from '../../stores/UserStore'
import WithLoading from '../../services/WithLoading'

interface IState {
    user: IUserProfileResponse | null
}

export default class Service extends WithLoading{
    state: IState = observable({user: null})

    constructor() {
        super()

    }

    fetchUserProfile = action (
        async () => {
            this.loading()
            this.state.user = await getProfile()
            this.loaded()
        }
    )
}
