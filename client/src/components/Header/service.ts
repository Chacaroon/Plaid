import React from 'react'
import {action, observable} from 'mobx'
import {history} from '../../stores/RouterStore'
import userStore from '../../stores/UserStore'

interface IState {
    menuAnchor: HTMLElement | null
}
// TODO make service work with API
export default class Service {
    state: IState = observable({menuAnchor: null})

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
            userStore.isLoggedIn = false
            this.handleClose()
            history.push('/login')
        }
    )

    handleLoginClick = action (
        () => {
            history.push('/login')
        }
    )

    handleRegisterClick = action (
        () => {
            history.push('/register')
        }
    )
}
