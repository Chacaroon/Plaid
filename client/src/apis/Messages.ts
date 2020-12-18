import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/message',
  timeout: 5000,
  withCredentials: true
})

interface INewMessage {
  senderId: number
  recipientId: number
  date: Date
  content: string
}


async function getChats(): Promise<Array<any>> {
  return api.get('recipients').then(res => res.data)
}

async function getMessages(chatId: number): Promise<Array<any>> {
  return api.get(`user/${chatId}`).then(res => res.data)
}

async function sendMessage(message: INewMessage) {
  return api.post('', message).then(console.log).catch(console.log)
}

export {getChats, getMessages, sendMessage}
