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

async function updateBio(bio: string) {

}

export {getProfile, updateBio}
export type {IUserProfileResponse}
