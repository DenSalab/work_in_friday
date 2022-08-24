import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

// types
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
export type ResponseType<D = {}> = {
  updatedUser: D
  error?: string
}

export const profileAPI = {
  setUser() {
    return instance.post<ResponseType<UserType>>(`/auth/me`, {})
  },
  updateUser(name: string, avatar: string | null) {
    return instance.put<ResponseType<UserType>>(`/auth/me`, { name, avatar })
  },
}
