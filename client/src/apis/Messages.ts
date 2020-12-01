interface IMessage {
  id: number
  senderName: string
  content: string
}

interface IChat {
  id: number
  title: string
  userId: number
  userName: string
}

async function getChats(): Promise<Array<IChat>> {
  return [
    {
      id: 1,
      title: 'Chat 1',
      userId: 1,
      userName: 'Chatter 1'
    },
    {
      id: 2,
      title: 'Chat 2',
      userId: 2,
      userName: 'Chatter 2'
    },
    {
      id: 3,
      title: 'Chat 3',
      userId: 3,
      userName: 'Chatter 3'
    },
  ]
}

async function getMessages(chatId: number): Promise<Array<IMessage>> {
  return [
    {id: 1, senderName: 'user 1', content: 'message from user 1'},
    {id: 2, senderName: 'user 2', content: 'message from user 2'},
    {id: 3, senderName: 'user 1', content: 'message from user 1'},
  ]

}

async function sendMessage(chatId: number) {

}

export type {IChat, IMessage}
export {getChats, getMessages, sendMessage}
