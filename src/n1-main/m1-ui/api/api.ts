import axios, { AxiosResponse } from 'axios'
import { registerTC } from '../../m2-bll/auth-reducer'

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

// api
export const todolistsAPI = {}

///need to add arg (email: string, password: string, rememberMe: boolean)
export const authAPI = {
  login() {
    return instance.post('/auth/login', {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
      rememberMe: true,
    })
  },
  logout() {
    return instance.delete('/auth/me', {})
  },
  register(data: RegisterRequestType) {
    const promise = instance.post<{
      addedUser: {}
      error?: string
    }>('auth/register', { ...data })
    return promise
  },
  me() {
    const promise = instance.put<{
      _id: string
      email: string
      name: string
      avatar?: string
      publicCardPacksCount: number
      created: Date
      updated: Date
      isAdmin: boolean
      verified: boolean
      rememberMe: boolean
      error?: string
    }>('auth/me')
    return promise
  },
}

// types
export type RegisterRequestType = {
  email: string
  password: string
}
