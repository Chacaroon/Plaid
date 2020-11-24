import {observable} from 'mobx'
import {getCreatorInfo, ICreatorInfo} from '../../apis/Users'
import WithLoading from '../../services/WithLoading'
import {getPosts, IPost} from '../../apis/Posts'

interface IServiceParams {
  creatorId: number
}

interface IState {
  creatorInfo: ICreatorInfo
  posts: Array<IPost>
}

class Service extends WithLoading {
  state: IState = observable(
    {
      creatorInfo: {id: 0, name: '', tag: '', bio: ''},
      posts: []
    })

  constructor(params: IServiceParams) {
    super()
    this.state.creatorInfo.id = params.creatorId

    this.fetchCreatorInfo()
    this.fetchPosts()
  }

  async fetchCreatorInfo() {
    this.loading()
    this.state.creatorInfo = await getCreatorInfo(this.state.creatorInfo.id)
    this.loaded()
  }

  async fetchPosts() {
    this.state.posts = (await getPosts(this.state.creatorInfo.id)).posts
  }
}

export default Service
