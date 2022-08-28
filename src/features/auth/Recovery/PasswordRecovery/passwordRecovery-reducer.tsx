import { authAPI } from '../../../../api/api'
import { setAppStatusAC } from '../../../../app/app-reducer'
import { setServerErrorAC } from '../../auth-reducer'
import { ActionsType, AppThunk } from '../../../../app/store'

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
        dispatch(setServerErrorAC(error.response.statusText))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
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
        dispatch(setServerErrorAC(error.response.statusText))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }

// types
type InitialStateType = typeof initialState
