import { Dispatch } from 'redux'
import { authAPI, LoginRequestDataType } from '../dal/api'
import { setUserAC } from './profile-reducer'

enum login {
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  SET_SUCCESS = 'SET_SUCCESS',
}
const initialState: LoginStatusType = {
  error: '',
  loading: false,
  success: false,
}

export const loginReducer = (state = initialState, action: LoginActionsType) => {
  switch (action.type) {
    case login.SET_ERROR: {
      return { error: action.error, loading: false, success: false }
    }
    case login.SET_LOADING: {
      return { error: '', loading: action.loading, success: false }
    }
    case login.SET_SUCCESS: {
      return { error: '', loading: false, success: action.success }
    }
  }
  return state
}

// action creators
export const setLoading = (loading: boolean) => ({ type: login.SET_LOADING, loading } as const)
export const setSuccess = (success: boolean) => ({ type: login.SET_SUCCESS, success } as const)
export const setError = (error: string) => ({ type: login.SET_ERROR, error } as const)

// thunk creators

export const loginTC = (values: LoginRequestDataType) => (dispatch: Dispatch<LoginActionsType>) => {
  dispatch(setLoading(true))

  authAPI
    .login(values)
    .then((res) => {
      // диспатчим юзера в стейт профайла:
      // dispatch(setUser(res.data)) setUser нужно сделать на странице профайла
      console.log('login success')
      dispatch(setSuccess(true))
      dispatch(setUserAC(res.data))
    })
    .catch((e) => {
      const error = e.response ? e.response.data.error : e.message + ', more details in the console'
      console.log(error)
      dispatch(setError(error))
    })
}

//types
type LoginActionsType =
  | ReturnType<typeof setError>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setSuccess>
  | ReturnType<typeof setUserAC>

export type LoginStatusType = {
  error: string
  loading: boolean
  success: boolean
}
