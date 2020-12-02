import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'
import {addPost} from '../../../apis/Posts'
import {getSubscriptionLevels, ISubscriptionLevel} from '../../../apis/SubscriptionLevels'
import userStore from '../../../stores/UserStore'

interface IState {
  isEditing: boolean
  inputPost: string
  subscriptionLevels: Array<ISubscriptionLevel>
  selectedLevelId: number
}

interface IServiceParams {
  fetchPosts: (() => void)
}

export default class Service extends WithLoading {
  state: IState = observable({
    isEditing: false,
    inputPost: '',
    subscriptionLevels: [],
    selectedLevelId: 0
  })

  private readonly fetchPosts: (() => void)

  constructor(params: IServiceParams) {
    super()
    this.fetchPosts = params.fetchPosts
    this.fetchLevels()
  }

  handleEditing = action(
    () => {
      this.state.isEditing = true
      this.fetchLevels()
    }
  )

  handlePostChange = action(
    (content: string) => {
      this.state.inputPost = content
    }
  )

  handleSubmit = action(
    async () => {
      await addPost({
        content: this.state.inputPost,
        subscriptionLevelId: this.state.selectedLevelId
      })
      this.state.isEditing = false
      this.state.inputPost = ''
      await this.fetchPosts()
    }
  )

  fetchLevels = action(
    async () => {
      this.state.subscriptionLevels = await getSubscriptionLevels(userStore.user.id)
      if(this.state.subscriptionLevels.length > 0)
        this.state.selectedLevelId = this.state.subscriptionLevels[0].id
    }
  )

  handleLevelSelect = action(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      this.state.selectedLevelId = event.target.value as number
    }
  )
}
