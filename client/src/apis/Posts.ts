import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/post',
  timeout: 5000,
  withCredentials: true
})

type Post = {
  id: number
  content: string
}

type IPostsResponse = {
  posts: Array<Post>
} & ErrorHandling

async function addPost(post: string) {
  return api.post('add').catch(console.log)
}

async function getPosts(creatorId: string): Promise<IPostsResponse> {
  return {
    posts: [
      {id: 1, content: '<h1>POST1</h1>'},
      {id: 2, content: '<h1>POST2</h1>'}
    ]
  }
}

export {getPosts}
export type {Post, IPostsResponse}
