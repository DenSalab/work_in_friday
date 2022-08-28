import { AxiosError } from 'axios'

import { authAPI } from '../../../../api/api'
import { setAppStatusAC } from '../../../../app/app-reducer'
import { ActionsType, AppThunk } from '../../../../app/store'
import { serverErrorHandler } from '../../../../common/utils/serverErrorHandler'
import { setServerErrorAC } from '../../auth-reducer'

const initialState = {
  recoveryEmail: '',
}

export const passwordRecoveryReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'recovery/SET-RECOVERY-EMAIL':
      return { ...state, recoveryEmail: action.email }
    default:
      return state
  }
}
// actions
export const setRecoveryEmailAC = (email: string) =>
  ({ type: 'recovery/SET-RECOVERY-EMAIL', email } as const)

// thunks
export const passwordRecoveryTC =
  (email: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setRecoveryEmailAC(email))

    authAPI
      .passwordRecovery(email)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        //dispatch(setServerErrorAC(error.response.statusText))
        serverErrorHandler(error as AxiosError | Error, dispatch)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))

    authAPI
      .setNewPassword(password, resetPasswordToken)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        //dispatch(setServerErrorAC(error.response.statusText))
        serverErrorHandler(error as AxiosError | Error, dispatch)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

// types
type InitialStateType = typeof initialState
