import { authAPI } from '../m1-ui/api/api'
import { Dispatch } from 'redux'

const SET_USER_DATA = 'login/SET_USER_DATA'
const CLEAR_USER_DATA = 'login/CLEAR_USER_DATA'
const initialState = {}

export const loginReducer = (state = initialState, action: LoginActionsType) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.userData }
    case CLEAR_USER_DATA:
      return {}
  }
  return state
}

// action creators
export const setUserData = (userData: LoginResponseDataType) => {
  return { type: SET_USER_DATA, userData }
}
export const clearUserData = () => ({ type: SET_USER_DATA })

// thunk creators
export const loginTC =
  (loginData: LoginRequestDataType) => (dispatch: Dispatch<LoginActionsType>) => {
    authAPI
      .login(loginData)
      .then((res) => {
        console.log(res.data)
        dispatch(setUserData(res.data))
      })
      .catch((e) => {
        console.log(e.response.data)
      })
  }

//types
type LoginActionsType = ReturnType<typeof setUserData> | ReturnType<typeof setUserData>

export type LoginRequestDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponseDataType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
  deviceTokens: DeviceTokenType[]
}

type DeviceTokenType = {
  _id: string
  device: string
  token: string
  tokenDeathTime: number
}
