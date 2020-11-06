import {action, observable} from 'mobx'
import {IUserProfileResponse, getProfile} from '../../apis/Profile'
import WithLoading from '../../services/WithLoading'

interface IState {
  profile: IUserProfileResponse
}

export default class Service extends WithLoading {
  state: IState = observable({
    profile: {name: '', tag: '', email: '', bio: '', isCreator: false}
  })

  constructor() {
    super()

    this.fetchUserProfile()
  }

  fetchUserProfile = action(
    async () => {
      this.loading()
      this.state.profile = await getProfile()
      this.loaded()
    }
  )
}
