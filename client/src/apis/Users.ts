import {ErrorHandling} from '../utils/ErrorHandling'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:5001/api/account',
    timeout: 5000,
    withCredentials: true
})

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
    roles: string[]
} & ErrorHandling

async function isTagTaken(tag: string): Promise<boolean> {
    return false
}

async function isEmailTaken(email: string): Promise<boolean> {
    return false
}

async function register(newUser: INewUser): Promise<IUserCreateResponse> {
    return api.post('register', newUser).then(res => res.data).catch(res => res.data)
}

async function login(credentials: IUserCredentials): Promise<IUserCreateResponse> {
    return api.post('login', credentials).then(res => res.data).catch(res => res.data)
}

async function refreshAccessToken() {
    return api.post('refresh-token').catch(console.log)
}

async function logout() {
    return api.post('logout').catch(console.log)
}

async function current(): Promise<IUserResponse> {
    // return {
    //     name: 'Name',
    //     tag: 'tag123',
    //     email: 'example@gmail.com',
    //     bio: 'my bio :)',
    //     roles: ['creator']
    // }
    return api.get('current').then(res => res.data).catch(console.log)
}

async function updateBio(bio: string) {
    return api.post('change-bio', {bio})
}

interface ICreatorInfo {
    id: number
    name: string
    tag: string
    bio: string
}

async function getCreatorInfo(creatorId: number): Promise<ICreatorInfo> {
    console.log('getCreatorInfo')
    return {
        id: creatorId,
        name: 'John Doe',
        tag: 'john_cool337',
        bio: "I'm an artist. I'm a performance artist."
    }
}

api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        await refreshAccessToken()
        return api(originalRequest)
    }
    return Promise.reject(error.response)
})

export {isTagTaken, isEmailTaken, register, login, current, logout, updateBio, getCreatorInfo}
export type
{
    INewUser, IUserCredentials, IUserResponse, ICreatorInfo
}
