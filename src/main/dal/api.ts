import axios, { AxiosResponse } from 'axios'
import { registerTC } from '../bll/auth-reducer'
import {
  LoginRequestDataType,
  LoginResponseDataType,
  LogoutResponseType,
} from '../bll/loginReducer'

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
    return instance.put<AuthMeResponseType>('auth/me')
  },
  passwordRecovery(email: string) {
    const data: PasswordRecoveryRequestType = getPasswordRecoveryRequestData(email)
    return instance.post<{ info: string; error: string }>('auth/forgot', { ...data })
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

export type AuthMeResponseType = {
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
}
export type PasswordRecoveryRequestType = {
  email: string
  from: string
  message: string
}
