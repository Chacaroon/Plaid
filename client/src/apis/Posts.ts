import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'
import testPost from './TEST_POST'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/post',
  timeout: 5000,
  withCredentials: true
})

type IPost = {
  id: number
  content: string
}

type IPostsResponse = {
  posts: Array<IPost>
} & ErrorHandling

async function addPost(post: string) {
  return api.post('add').catch(console.log)
}

async function getPosts(creatorId: number): Promise<IPostsResponse> {
  return {
    posts: [
      {id: 1, content: testPost},
      {id: 2, content: testPost}
    ]
  }
}

export {getPosts}
export type {IPost, IPostsResponse}
