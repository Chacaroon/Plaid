import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'
import {
  addSubscriptionLevel,
  getSubscriptionLevels,
  ISubscriptionLevel, removeSubscriptionLevel
} from '../../../apis/SubscriptionLevels'
import userStore from '../../../stores/UserStore'

interface IState {
  levels: Array<ISubscriptionLevel>
  isEditing: boolean
  inputName: string
  inputCost: string
}

export default class Service extends WithLoading {
  state: IState = observable({
    levels: [],
    isEditing: false,
    inputName: '',
    inputCost: ''
  })

  constructor() {
    super()

    this.fetchLevels()
  }

  handleEditing = action(
    () => {
      this.state.isEditing = true
    }
  )

  handleNameChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      this.state.inputName = event.target.value
    }
  )

  handleCostChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.match(/^\d{0,5}$/)) {
        this.state.inputCost = event.target.value
      }
    }
  )

  handleSubmit = action(
    async () => {
      await addSubscriptionLevel({
        name: this.state.inputName,
        cost: Number(this.state.inputCost)
      })
      this.state.isEditing = false
      this.fetchLevels()
    }
  )

  fetchLevels = action(
    async () => {
      this.state.levels = await getSubscriptionLevels(userStore.user.id)
    }
  )

  handleRemove = action(
    async (id: number) => {
      await removeSubscriptionLevel(id)
      this.fetchLevels()
    }
  )
}
