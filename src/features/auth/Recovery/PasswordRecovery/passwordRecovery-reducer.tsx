import { AxiosError } from 'axios'

import { authAPI } from '../../../../api/authAPI'
import { setAppErrorAC, setAppStatusAC } from '../../../../app/app-reducer'
import { ActionsType, AppThunk } from '../../../../app/store'
import { serverErrorHandler } from '../../../../common/utils/serverErrorHandler'

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
    dispatch(setAppErrorAC(null))
    dispatch(setAppStatusAC('loading'))
    dispatch(setRecoveryEmailAC(email))

    authAPI
      .passwordRecovery(email)
      .then(res => {
        console.log(res)
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(error => {
        //dispatch(setServerErrorAC(error.response.statusText))
        serverErrorHandler(error as AxiosError | Error, dispatch)
      })
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppErrorAC(null))

    authAPI
      .setNewPassword(password, resetPasswordToken)
      .then(res => {
        console.log(res)
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(error => {
        serverErrorHandler(error as AxiosError | Error, dispatch)
      })
  }

// types
type InitialStateType = typeof initialState
