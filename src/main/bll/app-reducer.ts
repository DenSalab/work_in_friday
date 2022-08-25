import { authAPI } from '../dal/api'
import { setIsLoggedInAC, setServerErrorAC } from './auth-reducer'
import { getUserTC } from './profile-reducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null,
  isInitialized: false,
}

export type InitialStateType = {
  status: RequestStatusType // происходит ли сейчас взаимодействие с сервером
  error: string | null // если глобальная ошибка - то запишем текст ошибки
  isInitialized: boolean // true когда приложение проинициализировалось (проверили юзера, получили настройки от сервера)
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
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

export const initializeAppTC = () => (dispatch: any) => {
  authAPI
    .getUser()
    .then(() => {
      console.log('Успешно')
      dispatch(setIsLoggedInAC(true))
      dispatch(getUserTC())
    })
    .catch((error) => {
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

export type AppActionsType =
  | SetAppStatusActionType
  | SetAppErrorActionType
  | SetAppInitializedActionType
