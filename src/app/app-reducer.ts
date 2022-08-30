import { AxiosError } from 'axios'

import { authAPI } from '../api/authAPI'
import { serverErrorHandler } from '../common/utils/serverErrorHandler'
import { setIsLoggedInAC } from '../features/auth/auth-reducer'
import { setUserAC } from '../features/auth/Profile/profile-reducer'

import { ActionsType, AppThunk } from './store'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
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
    case 'app/SET-STATUS':
      return { ...state, status: action.status }
    case 'app/SET-ERROR':
      return { ...state, error: action.error }
    case 'app/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.value }
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'app/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'app/SET-ERROR', error } as const)
export const setAppInitializedAC = (value: boolean) =>
  ({ type: 'app/SET-IS-INITIALIZED', value } as const)

export const initializeAppTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setAppErrorAC(null))
  try {
    const res = await authAPI.getUser()
    dispatch(setIsLoggedInAC(true))
    dispatch(setUserAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    serverErrorHandler(e as AxiosError | Error, dispatch)
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

export type SetAppStatusActionType = { type: 'app/SET-STATUS'; status: RequestStatusType }
export type SetAppErrorActionType = { type: 'app/SET-ERROR'; error: string | null }
export type SetAppInitializedActionType = { type: 'app/SET-IS-INITIALIZED'; value: boolean }
