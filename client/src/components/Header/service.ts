import React from 'react'
import {action, observable} from 'mobx'
import {history} from '../../stores/RouterStore'
import userStore from '../../stores/UserStore'
import WithLoading from '../../services/WithLoading'
import {current, logout} from '../../apis/Users'

interface IState {
  menuAnchor: HTMLElement | null,
}

export default class Service extends WithLoading {
  state: IState = observable({menuAnchor: null})

  constructor() {
    super()
    this.loadUser()
  }

  handleClick = action(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      this.state.menuAnchor = event.currentTarget
    }
  )

  handleProfile = action(
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

  handleLogout = action(
    async () => {
      await logout()
      userStore.isLoggedIn = false
      this.handleClose()
      history.push('/login')
    }
  )

  handleLoginClick = action(
    () => {
      history.push('/login')
    }
  )

  handleRegisterClick = action(
    () => {
      this.handleClose()
      history.push('/register')
    }
  )

  handleSettings = action(
    () => {
      this.handleClose()
      history.push('/settings')
    }
  )

  loadUser = action(
    async () => {
      this.loading()
      let user = await current()
      if (!user) {
        history.push('/login')
        userStore.isLoggedIn = false
      } else {
        userStore.isLoggedIn = true
        userStore.user = user
      }
      console.log(user)
      this.loaded()
    }
  )
}
