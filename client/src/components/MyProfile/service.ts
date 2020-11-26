import {action, observable} from 'mobx'
import WithLoading from '../../services/WithLoading'
import {current, IUserResponse} from '../../apis/Users'
import {getPosts, IPost} from '../../apis/Posts'
import userStore from '../../stores/UserStore'

interface IState {
  profile: IUserResponse,
  posts: Array<IPost>
}

export default class Service extends WithLoading {
  state: IState = observable({
    profile: {id: 0, name: '', tag: '', email: '', bio: '', roles: []},
    posts: []
  })

  constructor() {
    super()

    this.fetchUserProfile()
    this.fetchPosts()
  }

  fetchUserProfile = action(
    async () => {
      this.loading()
      this.state.profile = await current()
      this.loaded()
    }
  )

  fetchPosts = action(
    async () => {
      this.state.posts = (await getPosts(userStore.user.id)).posts
    }
  )
}
