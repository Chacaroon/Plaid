import {action, observable} from 'mobx'
import {getCreatorInfo, IUserResponse} from '../../apis/Users'
import WithLoading from '../../services/WithLoading'
import {getPosts, IPost} from '../../apis/Posts'

interface IServiceParams {
  creatorId: number
}

interface IState {
  creatorInfo: IUserResponse
  posts: Array<IPost>
}

class Service extends WithLoading {
  state: IState = observable(
    {
      creatorInfo: {id: 0, name: '', tag: '', email: '', bio: '', roles: []},
      posts: []
    })

  constructor(params: IServiceParams) {
    super()
    this.state.creatorInfo.id = params.creatorId

    this.fetchCreatorInfo()
    this.fetchPosts()
  }

  fetchCreatorInfo = action(async () => {
    this.loading()
    this.state.creatorInfo = await getCreatorInfo(this.state.creatorInfo.id)
    console.log(await getCreatorInfo(this.state.creatorInfo.id))
    this.loaded()
  })

  fetchPosts = action(async () => {
    this.state.posts = await getPosts(this.state.creatorInfo.id)
  })
}

export default Service
