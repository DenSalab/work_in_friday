import { authAPI } from '../dal/api'

import { setIsLoggedInAC, setServerErrorAC } from './auth-reducer'
import { getUserTC } from './profile-reducer'
import { ActionsType, AppThunk } from './store'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'succeeded' as RequestStatusType,
  error: null,
  isInitialized: false,
}

type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.value }
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppInitializedAC = (value: boolean) =>
  ({ type: 'APP/SET-IS-INITIALIZED', value } as const)

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .getUser()
    .then(() => {
      console.log('Успешно')
      dispatch(setIsLoggedInAC(true))
      dispatch(getUserTC())
    })
    .catch(error => {
      dispatch(setServerErrorAC(error.response.statusText))
    })
    .finally(() => {
      dispatch(setAppInitializedAC(true))
      dispatch(setAppStatusAC('succeeded'))
    })
}

export type SetAppStatusActionType = { type: 'APP/SET-STATUS'; status: RequestStatusType }
export type SetAppErrorActionType = { type: 'APP/SET-ERROR'; error: string | null }
export type SetAppInitializedActionType = { type: 'APP/SET-IS-INITIALIZED'; value: boolean }
