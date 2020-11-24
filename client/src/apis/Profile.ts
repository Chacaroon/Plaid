import {ErrorHandling} from '../utils/ErrorHandling'

type IUserProfileResponse = {
    name: string
    tag: string
    email: string
    bio?: string
    isCreator: boolean
} & ErrorHandling

async function getProfile(): Promise<IUserProfileResponse> {
    return {
        name: 'Name',
        tag: 'tag123',
        email: 'example@gmail.com',
        bio: 'my bio :)',
        isCreator: false
    }
}

export {getProfile}
export type {IUserProfileResponse}
