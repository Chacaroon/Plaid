import React from 'react'
import {action, observable} from 'mobx'

import userStore from '../../stores/UserStore'

interface IState {
    menuAnchor: HTMLElement | null
    isLoggedIn: boolean
}

export default class Service {
    state: IState = observable({menuAnchor: null, isLoggedIn: userStore.isLoggedIn})

    handleClick = action(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            this.state.menuAnchor = event.currentTarget
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
        }
    )

    handleLogin = action (
        () => {
            this.state.isLoggedIn = true
        }
    )
}
