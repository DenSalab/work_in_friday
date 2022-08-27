import { authAPI, LoginRequestDataType } from '../../../api/api'
import { setAppStatusAC } from '../../../app/app-reducer'
import { setUserAC } from '../profile/Profile/profile-reducer'
import { ActionsType, AppThunk } from '../../../app/store'

const initialState = {
  error: '',
  loading: false,
  success: false,
}

export const loginReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login.SET_ERROR': {
      return { error: action.error, loading: false, success: false }
    }
    case 'login.SET_LOADING': {
      return { error: '', loading: action.loading, success: false }
    }
    case 'login.SET_SUCCESS': {
      return { error: '', loading: false, success: action.success }
    }
  }

  return state
}

// action creators
export const setLoading = (loading: boolean) => ({ type: 'login.SET_LOADING', loading } as const)
export const setSuccess = (success: boolean) => ({ type: 'login.SET_SUCCESS', success } as const)
export const setError = (error: string) => ({ type: 'login.SET_ERROR', error } as const)

// thunk creators
export const loginTC =
  (values: LoginRequestDataType): AppThunk =>
  (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setAppStatusAC('loading'))
    authAPI
      .login(values)
      .then((res) => {
        console.log('login success')
        dispatch(setSuccess(true))
        dispatch(setUserAC(res.data))
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
        dispatch(setError(error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }

//types

type InitialStateType = typeof initialState
