import WithLoading from '../../../services/WithLoading'
import {action, observable} from 'mobx'
import {getMessages, IMessage, sendMessage} from '../../../apis/Messages'
import {addComment} from '../../../apis/Comments'

interface IState {
  messages: Array<IMessage>
  inputMessage: string
}

export default class Service extends WithLoading {
  state: IState = observable({
    messages: [],
    inputMessage: ''
  })
  chatId: number
  constructor(chatId: number) {
    super()
    this.chatId = chatId
    this.fetchMessages()
  }

  fetchMessages = action (
    async () => {
      this.state.messages = await getMessages(this.chatId)
    }
  )

  handleMessageChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      this.state.inputMessage = event.target.value
    }
  )

  handleSubmit = action(
    async () => {
      await sendMessage(this.chatId)
      await this.fetchMessages()
      this.state.inputMessage = ''
    }
  )
}
