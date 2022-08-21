import axios, { AxiosResponse } from 'axios'
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

// types
export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}
export type ResponseType<D = {}> = {
  updatedUser: D
  error?: string
}

export const profileAPI = {
  authMe() {
    return instance.post('/auth/me', {})
  },
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
  updateUser(name: string, avatar: string) {
    return instance.put<ResponseType<UserType>>(`/auth/me`, {
      name: name,
      avatar: avatar,
    })
  },
}
