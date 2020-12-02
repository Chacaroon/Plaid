import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'
import {
  getSubscriptionLevels,
  ISubscriptionLevel,
  subscribe
} from '../../../apis/SubscriptionLevels'

interface IServiceParams {
  creatorId: number
}

interface IState {
  subscriptionLevels: Array<ISubscriptionLevel>
  selectedLevelId: number
}

export default class Service extends WithLoading {
  state: IState = observable({
    subscriptionLevels: [],
    selectedLevelId: 0
  })
  private readonly creatorId: number

  constructor(params: IServiceParams) {
    super()
    this.creatorId = params.creatorId
    this.fetchLevels()
  }

  fetchLevels = action (
    async () => {
      this.state.subscriptionLevels = await getSubscriptionLevels(this.creatorId)
      if(this.state.subscriptionLevels.length > 0)
        this.state.selectedLevelId = this.state.subscriptionLevels[0].id
    }
  )

  handleLevelSelect = action (
    (event: React.ChangeEvent<{ value: unknown }>) => {
        this.state.selectedLevelId = event.target.value as number
    }
  )

  handleSubscribe = action (
    async () => {
        subscribe({creatorId: this.creatorId, subLevelId: this.state.selectedLevelId})
    }
  )
}
