import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'
import testPost from './TEST_POST'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/posts',
  timeout: 5000,
  withCredentials: true
})

type IPost = {
  id: number
  authorId: number
  authorName: string
  content: string
}

type IPostsResponse = {
  posts: Array<IPost>
} & ErrorHandling

async function addPost(post: string) {
  return api.post('', {post}).catch(console.log)
}

async function getPosts(creatorId: number): Promise<IPostsResponse> {
  return {
    posts: [
      {id: 1, authorId: 1, authorName:'author1', content: testPost},
      {id: 2, authorId: 2, authorName:'author2', content: testPost}
    ]
  }
}

export {getPosts, addPost}
export type {IPost, IPostsResponse}
