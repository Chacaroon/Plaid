import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:5001/api/sub-levels',
  timeout: 5000,
  withCredentials: true
})

interface IAddSubscriptionLevel {
  name: string,
  cost: number
}

interface ISubscribe {
  subLevelId: number,
  creatorId: number
}

type ISubscriptionLevel = {
  id: number,
  name: string,
  cost: number
}

async function getSubscriptionLevels(creatorId: number): Promise<Array<ISubscriptionLevel>> {
  // return [
  //   {id: 1, name: 'Level1', cost: 50},
  //   {id: 2, name: 'Level2', cost: 100},
  //   {id: 3, name: 'Level3', cost: 200}
  // ]
  return api.get(`${creatorId}`).then(res => res.data)
}

async function addSubscriptionLevel(level: IAddSubscriptionLevel) {
  return api.post('add-level', level)
}

async function removeSubscriptionLevel(levelId: number) {

}

async function subscribe(sub: ISubscribe) {

}

export type {ISubscriptionLevel}
export {getSubscriptionLevels, addSubscriptionLevel, removeSubscriptionLevel, subscribe}
