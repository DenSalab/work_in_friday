import axios, { AxiosResponse } from 'axios'
import { registerTC } from '../../m2-bll/auth-reducer'

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

// api
export const authAPI = {
  login() {},
  logout() {},
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
  passwordRecovery(data: PasswordRecoveryRequestType) {
    const promise = instance.post<{ info: string; error: string }>('auth/forgot')
  },
}

// types
export type RegisterRequestType = {
  email: string
  password: string
}
export type PasswordRecoveryRequestType = {
  email: string
  from: string
  message: string
}
