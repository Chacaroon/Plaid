import React from 'react'
import {action, observable} from 'mobx'
import {history} from '../../stores/RouterStore'
import userStore from '../../stores/UserStore'

interface IState {
    menuAnchor: HTMLElement | null
    isLoggedIn: boolean
}
// TODO make service work with API
export default class Service {
    state: IState = observable({menuAnchor: null, isLoggedIn: userStore.isLoggedIn})

    handleClick = action(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            this.state.menuAnchor = event.currentTarget
        }
    )

    handleProfile = action (
        () => {
            this.handleClose()
            history.push('/profile')
        }
    )

    handleClose = action(
        () => {
            this.state.menuAnchor = null
        }
    )

    handleLogout = action (
        () => {
            this.state.isLoggedIn = false
            this.handleClose()
            history.push('/login')
        }
    )

    handleLogin = action (
        () => {
            this.state.isLoggedIn = true
        }
    )
}
