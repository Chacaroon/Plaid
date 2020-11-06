import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:5001/api/account',
    timeout: 5000
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

type IUserCreateResponse = {
    accessToken: string
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

async function testToken(): Promise<any> {
    return api.get('', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
    })
}

async function register(newUser: INewUser): Promise<IUserCreateResponse> {
    return api.post('register', newUser).then(res => res.data)
}

async function login(credentials: IUserCredentials): Promise<IUserCreateResponse> {
    return api.post('login', credentials).then(res => res.data)
}

export {isTagTaken, isEmailTaken, register, login, testToken}
export type
{
    INewUser, IUserCredentials
}
