import { AxiosError } from 'axios'

import { authAPI, RegisterRequestType } from '../../api/api'
import { setAppStatusAC } from '../../app/app-reducer'
import { ActionsType, AppThunk } from '../../app/store'
import { serverErrorHandler } from '../../common/utils/serverErrorHandler'

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  serverError: '',
}

type InitialStateType = typeof initialState

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-LOGGED-IN', value } as const)
export const setIsRegisteredAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-REGISTERED', value } as const)
export const setServerErrorAC = (error: string) =>
  ({ type: 'auth/SET-SERVER-ERROR', error } as const)

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'auth/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'auth/SET-IS-REGISTERED':
      return { ...state, isRegistered: action.value }
    case 'auth/SET-SERVER-ERROR':
      return { ...state, serverError: action.error }
    default:
      return state
  }
}

// thunks
export const registerTC =
  (data: RegisterRequestType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await authAPI.register(data)
      dispatch(setIsRegisteredAC(true))
      dispatch(setServerErrorAC(''))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
      //dispatch(setServerErrorAC(e.response.statusText))
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
