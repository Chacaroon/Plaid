import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/categories',
  timeout: 5000,
  withCredentials: true
})


async function getCreators(category: string): Promise<Array<any>> {
  return api.get(`${category}/creators`).then(res => res.data)
}

export {getCreators}
