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
    return instance.put<UserType>('auth/me')
  },
  passwordRecovery(email: string) {
    const data: PasswordRecoveryRequestType = getPasswordRecoveryRequestData(email)
    return instance.post<{ info: string; error: string }>('auth/forgot', { ...data })
  },
  setUser() {
    return instance.post<ResponseType<UserType>>(`/auth/me`, {})
  },
  updateUser(name: string, avatar: string | null) {
    return instance.put<ResponseType<UserType>>(`/auth/me`, { name, avatar })
  },
}
export const getPasswordRecoveryRequestData = (email: string) => {
  return {
    email,
    from: 'test-front-admin <ai73a@yandex.by>',
    message: `<div style="background-color: lime; padding: 15px">password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`,
  }
}

// types
export type RegisterRequestType = {
  email: string
  password: string
}
export type ResponseType<D = {}> = {
  updatedUser: D
  error?: string
}
export type UserType = {
  _id: string | null
  email: string | null
  name: string
  avatar: string
  publicCardPacksCount: number | null
  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string | null
}
export type PasswordRecoveryRequestType = {
  email: string
  from: string
  message: string
}
