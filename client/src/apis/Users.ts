import {ErrorHandling} from '../utils/ErrorHandling'

type IsTaken = {
    isTaken: boolean
} & ErrorHandling

interface INewUser {
    name: string
    tag: string
    email: string
    password: string
    isCreator: boolean
}

type IUserResponse = {
    name: string
    tag: string
    email: string
} & ErrorHandling

interface IUserCredentials {
    email: string
    password: string
}

async function isTagTaken(tag: string): Promise<IsTaken> {
    return {
        isTaken: false
    }
}

async function isEmailTaken(email: string): Promise<IsTaken> {
    return {
        isTaken: false
    }
}

async function register(newUser: INewUser): Promise<IUserResponse> {
    return {
        name: newUser.name,
        tag: newUser.tag,
        email: newUser.email
    }
}

async function login(credentials: IUserCredentials): Promise<IUserResponse> {
    return {
        name: 'Name',
        tag: 'tag123',
        email: credentials.email
    }
}



export {isTagTaken, isEmailTaken, register, login}
export type {INewUser, IUserCredentials}
