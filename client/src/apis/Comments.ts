import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/comments',
  timeout: 5000,
  withCredentials: true
})

type IComment = {
  id: number
  authorId: number
  authorName: string
  content: string
}


interface IAddComment {
  content: string
  postId: number
}

async function addComment(comment: IAddComment) {
  return api.post('', comment).catch(console.log)
}

async function getComments(postId: number): Promise<Array<IComment>> {
  return api.get(`${postId}`).then(res => res.data)
  // return [
  //   {id: 1, authorId: 1, authorName: 'author1', content: 'comment1 pog pog pog pog'},
  //   {id: 2, authorId: 2, authorName: 'author2', content: 'comment2 pag pag pag pag'}
  // ]
}

export {addComment, getComments}
export type {IComment}
