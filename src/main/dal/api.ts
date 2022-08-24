import axios from 'axios'

import {
  LoginRequestDataType,
  LoginResponseDataType,
  LogoutResponseType,
} from '../bll/login-reducer'

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

// api
export const todolistsAPI = {}

export const authAPI = {
  login(loginData: LoginRequestDataType) {
    return instance.post<LoginResponseDataType>('auth/login', loginData)
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/me')
  },
  register(data: RegisterRequestType) {
    return instance.post<{
      addedUser: {}
      error?: string
    }>('auth/register', { ...data })
  },
  me() {
    return instance.put<{
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
  },
}

// types
export type RegisterRequestType = {
  email: string
  password: string
}
