import axios from 'axios'
import { getPasswordRecoveryRequestData } from './utils/getPasswordRecoveryRequestData'

const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0/',
  baseURL: ' https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

// api
export const authAPI = {
  getUser() {
    return instance.post<UserDataType>(`/auth/me`, {})
  },
  login(loginData: LoginRequestDataType) {
    return instance.post<UserDataType>('auth/login', loginData)
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/me')
  },
  register(data: RegisterRequestType) {
    return instance.post<RegisterResponseType>('auth/register', data)
  },
  passwordRecovery(email: string) {
    const data: PasswordRecoveryRequestType = getPasswordRecoveryRequestData(email)
    return instance.post<PasswordRecoveryResponseType>('auth/forgot', data)
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<SetNewPasswordResponseType>('/auth/set-new-password', {
      password,
      resetPasswordToken,
    })
  },
  updateUser(name: string, avatar: string | null = null) {
    return instance.put<UpdateUserRequestType>(`/auth/me`, { name, avatar })
  },
}

// types
export type RegisterRequestType = {
  email: string
  password: string
}

export type UpdateUserRequestType = {
  updatedUser: UserDataType
  error?: string
}
export type PasswordRecoveryRequestType = {
  email: string
  from: string
  message: string
}
export type PasswordRecoveryResponseType = {
  info: string
  error: string
}

export type UserDataType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean // подтвердил ли почту
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  __v: number
  token: string
  tokenDeathTime: number
  avatar?: string
  error?: string
  deviceTokens: DeviceTokenType[]
}

type DeviceTokenType = {
  _id: string
  device: string
  token: string
  tokenDeathTime: number
}

export type LogoutResponseType = {
  info?: string
  error: string
}

export type LoginRequestDataType = {
  email: string
  password: string
  rememberMe: boolean
  // rememberMe: false - куки умрут через 3 часа
  // rememberMe: false: true - куки умрут через 7 часов
}

export type RegisterResponseType = {
  addedUser: {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date
    updated: Date
    __v: number
  }
  error?: string
}

export type SetNewPasswordResponseType = {
  info: string
  error: string
}
