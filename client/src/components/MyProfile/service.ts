import {action, observable} from 'mobx'
import WithLoading from '../../services/WithLoading'
import {current, IUserResponse} from '../../apis/Users'

interface IState {
  profile: IUserResponse
}

export default class Service extends WithLoading {
  state: IState = observable({
    profile: {name: '', tag: '', email: '', bio: '', roles: []}
  })

  constructor() {
    super()

    this.fetchUserProfile()
  }

  fetchUserProfile = action(
    async () => {
      this.loading()
      this.state.profile = await current()
      this.loaded()
    }
  )
}
