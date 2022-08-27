import { authAPI, LoginRequestDataType } from '../../../api/api'
import { setAppStatusAC } from '../../../app/app-reducer'
import { setUserAC } from '../Profile/profile-reducer'
import { ActionsType, AppThunk } from '../../../app/store'
import { AxiosError } from 'axios'
import { serverErrorHandler } from '../../../common/utils/serverErrorHandler'

const initialState = {
  error: '',
  loading: false,
  success: false,
}

export const loginReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'Login.SET_ERROR': {
      return { error: action.error, loading: false, success: false }
    }
    case 'Login.SET_LOADING': {
      return { error: '', loading: action.loading, success: false }
    }
    case 'Login.SET_SUCCESS': {
      return { error: '', loading: false, success: action.success }
    }
  }

  return state
}

// action creators
export const setLoading = (loading: boolean) => ({ type: 'Login.SET_LOADING', loading } as const)
export const setSuccess = (success: boolean) => ({ type: 'Login.SET_SUCCESS', success } as const)
export const setError = (error: string) => ({ type: 'Login.SET_ERROR', error } as const)

// thunk creators
export const loginTC =
  (values: LoginRequestDataType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true))
      dispatch(setAppStatusAC('loading'))
      const res = await authAPI.login(values)
      dispatch(setSuccess(true))
      dispatch(setUserAC(res.data))
    } catch (e) {
      const error = e as Error | AxiosError<{ error: string }>
      serverErrorHandler(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setAppStatusAC('succeeded'))
    }
  }

//types
type InitialStateType = typeof initialState
