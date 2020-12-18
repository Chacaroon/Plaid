import WithLoading from '../../../services/WithLoading'
import {action, observable} from 'mobx'
import {getMessages, sendMessage} from '../../../apis/Messages'
import {addComment} from '../../../apis/Comments'
import userStore from '../../../stores/UserStore'

interface IState {
  messages: Array<any>
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

  fetchMessages = action(
    async () => {
      this.state.messages = await getMessages(this.chatId)
      console.log(await getMessages(this.chatId))
    }
  )

  handleMessageChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      this.state.inputMessage = event.target.value
    }
  )

  handleSubmit = action(
    async () => {
      await sendMessage({
        senderId: userStore.user.id,
        recipientId: Number(this.chatId),
        date: new Date(),
        content: this.state.inputMessage
      })
      await this.fetchMessages()
      this.state.inputMessage = ''
    }
  )
}
