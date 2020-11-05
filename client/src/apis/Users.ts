import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5001/api/account',
    timeout: 5000,
})

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
    return api.post('register', newUser)
}

async function login(credentials: IUserCredentials): Promise<IUserResponse> {
    return api.post('login', credentials)
}



export {isTagTaken, isEmailTaken, register, login}
export type {INewUser, IUserCredentials}
