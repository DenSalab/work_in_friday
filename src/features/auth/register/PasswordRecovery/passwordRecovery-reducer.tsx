import { authAPI } from '../../../../api/api'

import { setAppStatusAC } from '../../../../app/app-reducer'
import { setServerErrorAC } from '../../auth-reducer'
import { ActionsType, AppThunk } from '../../../../app/store'

const initialState = {
  recoveryEmail: '',
  recoveryRequestStatus: 'idle' as RecoveryRequestStatusType,
  newPasswordRequestStatus: 'idle' as RecoveryRequestStatusType,
}

export const passwordRecoveryReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'recovery/SET-RECOVERY-EMAIL':
      return { ...state, recoveryEmail: action.email }
    case 'recovery/SET-RECOVERY-REQUEST-STATUS':
      return { ...state, recoveryRequestStatus: action.status }
    case 'recovery/NEW-PASSWORD-RECOVERY-REQUEST-STATUS':
      return { ...state, newPasswordRequestStatus: action.status }
    default:
      return state
  }
}
// actions
export const setRecoveryEmailAC = (email: string) =>
  ({ type: 'recovery/SET-RECOVERY-EMAIL', email } as const)
export const recoveryRequestStatusAC = (status: RecoveryRequestStatusType) =>
  ({ type: 'recovery/SET-RECOVERY-REQUEST-STATUS', status } as const)
export const newPasswordRequestStatusAC = (status: RecoveryRequestStatusType) =>
  ({ type: 'recovery/NEW-PASSWORD-RECOVERY-REQUEST-STATUS', status } as const)

// thunks
export const passwordRecoveryTC =
  (email: string): AppThunk =>
  (dispatch) => {
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

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(newPasswordRequestStatusAC('loading'))
    authAPI
      .setNewPassword(password, resetPasswordToken)
      .then((res) => {
        console.log(res)
        dispatch(newPasswordRequestStatusAC('succeeded'))
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
type InitialStateType = typeof initialState
export type RecoveryRequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
