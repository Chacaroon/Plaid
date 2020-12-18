import WithLoading from '../../services/WithLoading'
import {getChats} from '../../apis/Messages'
import {action, observable} from 'mobx'

interface IState {
  chats: Array<any>
}

export default class Service extends WithLoading {
  state: IState = observable({
    chats:[]
  })

  constructor() {
    super()
    this.fetchChats()
  }

  fetchChats = action(
    async () => {
      this.state.chats = await getChats()
      console.log((await getChats()))
    }
  )

}
