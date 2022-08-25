import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from './app-reducer'
import { authAPI, RegisterRequestType } from '../dal/api'
import { setIsLoggedInAC, setIsRegisteredAC, setServerErrorAC } from './auth-reducer'

const initialState = {
  recoveryEmail: '', //email на который отправляется ссылка для восстановления пароля
  recoveryRequestStatus: 'idle' as RecoveryRequestStatusType,
}
type InitialStateType = typeof initialState

export const passwordRecoveryReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'recovery/SET-RECOVERY-EMAIL':
      return { ...state, recoveryEmail: action.email }
    case 'recovery/SET-RECOVERY-REQUEST-STATUS':
      return { ...state, recoveryRequestStatus: action.status }
    default:
      return state
  }
}
// actions
export const setRecoveryEmailAC = (email: string) =>
  ({ type: 'recovery/SET-RECOVERY-EMAIL', email } as const)
export const recoveryRequestStatusAC = (status: RecoveryRequestStatusType) =>
  ({ type: 'recovery/SET-RECOVERY-REQUEST-STATUS', status } as const)

// thunks
export const registerTC = (data: RegisterRequestType) => (dispatch: Dispatch<AuthActionsType>) => {
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

export const passwordRecoveryTC = (email: string) => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setRecoveryEmailAC(email))
  dispatch(recoveryRequestStatusAC('loading'))
  authAPI
    .passwordRecovery(email)
    .then((res) => {
      console.log(res)
      dispatch(recoveryRequestStatusAC('succeeded'))
    })
    .catch((error) => {
      dispatch(recoveryRequestStatusAC('failed'))
      dispatch(setServerErrorAC(error.response.statusText))
    })
    .finally(() => {
      dispatch(setAppStatusAC('succeeded'))
    })
}
// types

export type RecoveryRequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ReturnType<typeof setIsRegisteredAC>
  | ReturnType<typeof setServerErrorAC>
  | ReturnType<typeof setRecoveryEmailAC>
  | ReturnType<typeof recoveryRequestStatusAC>
