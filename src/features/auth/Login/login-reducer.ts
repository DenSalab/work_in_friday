import { AxiosError } from 'axios'

import { authAPI, LoginRequestDataType } from '../../../api/api'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { ActionsType, AppThunk } from '../../../app/store'
import { serverErrorHandler } from '../../../common/utils/serverErrorHandler'
import { setIsLoggedInAC } from '../auth-reducer'
import { setUserAC } from '../Profile/profile-reducer'

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
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppErrorAC(null))
    try {
      const res = await authAPI.login(values)

      dispatch(setAppStatusAC('succeeded'))
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserAC(res.data))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

//types
type InitialStateType = typeof initialState
