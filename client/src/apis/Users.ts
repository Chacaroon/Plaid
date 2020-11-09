import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:5001/api/account',
    timeout: 5000,
    withCredentials: true
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

type IUserCreateResponse = {} & ErrorHandling

interface IUserCredentials {
    email: string
    password: string
}

type IUserResponse = {
    name: string
    tag: string
    email: string
    bio?: string
    isCreator: boolean
} & ErrorHandling

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

async function register(newUser: INewUser): Promise<IUserCreateResponse> {
    return api.post('register', newUser).then(res => res.data)
}

async function login(credentials: IUserCredentials): Promise<IUserCreateResponse> {
    return api.post('login', credentials).then(res => res.data)
}

async function refreshAccessToken() {
    return api.post('refresh-token')
}

async function current(): Promise<IUserResponse> {
    return api.get('current').then(res => res.data)
}

api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (error.response.status === 401) {
        return {data: undefined}
    }
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true
        await refreshAccessToken()
        return api(originalRequest)
    }
    return Promise.reject(error.response)
})

export {isTagTaken, isEmailTaken, register, login, current}
export type
{
    INewUser, IUserCredentials, IUserResponse
}
