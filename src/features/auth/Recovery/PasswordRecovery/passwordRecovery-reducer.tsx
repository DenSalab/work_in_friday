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
  async (dispatch) => {
    try {
      dispatch(setAppErrorAC(null))
      dispatch(setAppStatusAC('loading'))
      dispatch(setRecoveryEmailAC(email))
      await authAPI.passwordRecovery(email)
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC('loading'))
      dispatch(setAppErrorAC(null))
      await authAPI.setNewPassword(password, resetPasswordToken)
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

// types
type InitialStateType = typeof initialState
