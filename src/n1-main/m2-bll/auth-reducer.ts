import { Dispatch } from 'redux'
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../m2-bll/app-reducer'
import { authAPI, PasswordRecoveryRequestType, RegisterRequestType } from '../m1-ui/api/api'

const initialState = {
  isLoggedIn: false, //пользователь залогинен?
  isRegistered: false, //пользователь зарегистрирован?
  serverError: '', //пришла ли ошибка от сервера?
  recoveryEmail: '', //email на который отправляется ссылка для восстановления пароля
}
type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'login/SET-IS-REGISTERED':
      return { ...state, isRegistered: action.value }
    case 'login/SET-SERVER-ERROR':
      return { ...state, serverError: action.error }
    case 'login/SET-RECOVERY-EMAIL':
      return { ...state, recoveryEmail: action.email }
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
export const setRecoveryEmailAC = (email: string) =>
  ({ type: 'login/SET-RECOVERY-EMAIL', email } as const)

// thunks
export const registerTC = (data: RegisterRequestType) => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .register(data)
    .then((res) => {
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

export const passwordRecoveryTC = (email: string) => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setRecoveryEmailAC(email))
  authAPI
    .passwordRecovery(email)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      dispatch(setServerErrorAC(error.response.statusText))
    })
    .finally(() => {
      dispatch(setAppStatusAC('succeeded'))
    })
}
// types
export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ReturnType<typeof setIsRegisteredAC>
  | ReturnType<typeof setServerErrorAC>
  | ReturnType<typeof setRecoveryEmailAC>
