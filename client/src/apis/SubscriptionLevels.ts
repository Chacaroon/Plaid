import {ErrorHandling} from '../utils/ErrorHandling'

interface IAddSubscriptionLevel {
  name: string,
  cost: number
}

type ISubscriptionLevel = {
  id: number,
  name: string,
  cost: number
}

type ISubscriptionLevelsResponse = {
  subscriptionLevels: Array<ISubscriptionLevel>
} & ErrorHandling

async function getSubscriptionLevels(creatorId: number) : Promise<ISubscriptionLevelsResponse> {
  return {
    subscriptionLevels: [
      {id: 1, name: 'Level1', cost: 50},
      {id: 2, name: 'Level2', cost: 100},
      {id: 3, name: 'Level3', cost: 200},
    ]
  }
}

async function addSubscriptionLevel(level: IAddSubscriptionLevel) {

}

async function removeSubscriptionLevel(levelId: number) {

}


export type {ISubscriptionLevel}
export {getSubscriptionLevels, addSubscriptionLevel, removeSubscriptionLevel}
