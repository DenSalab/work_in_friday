import { authAPI, RegisterRequestType } from '../dal/api'

import { setAppStatusAC } from './app-reducer'
import { ActionsType, AppThunk } from './store'

const initialState = {
  isLoggedIn: true,
  isRegistered: false,
  serverError: '',
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'login/SET-IS-REGISTERED':
      return { ...state, isRegistered: action.value }
    case 'login/SET-SERVER-ERROR':
      return { ...state, serverError: action.error }
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const)
export const setIsRegisteredAC = (value: boolean) =>
  ({ type: 'login/SET-IS-REGISTERED', value } as const)
export const setServerErrorAC = (error: string) =>
  ({ type: 'login/SET-SERVER-ERROR', error } as const)

// thunks
export const registerTC =
  (data: RegisterRequestType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .register(data)
      .then(() => {
        dispatch(setIsRegisteredAC(true))
        dispatch(setServerErrorAC(''))
      })
      .catch((error) => {
        dispatch(setServerErrorAC(error.response.statusText))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
