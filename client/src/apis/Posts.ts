import axios from 'axios'

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

interface ICreatePost {
  content: string,
  subscriptionLevelId: number
}

async function addPost(post: ICreatePost) {
  return api.post('', post).catch(console.log)
}

async function getPosts(creatorId: number): Promise<Array<IPost>> {
  return api.get(`${creatorId}`).then(res => res.data)
  // return {
  //   posts: [
  //     {id: 1, authorId: 1, authorName:'author1', content: testPost},
  //     {id: 2, authorId: 2, authorName:'author2', content: testPost}
  //   ]
  // }
}

export {getPosts, addPost}
export type {IPost}
