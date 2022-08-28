import { AxiosError } from 'axios'

import { authAPI, UserDataType } from '../../../api/api'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { ActionsType, AppThunk } from '../../../app/store'
import { serverErrorHandler } from '../../../common/utils/serverErrorHandler'
import { setIsLoggedInAC } from '../auth-reducer'
import { setSuccess } from '../Login/login-reducer'

const initialState = {
  user: {} as UserDataType,
}

export const profileReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case 'profile/SET_USER':
      return { ...state, user: action.user }
    default:
      return state
  }
}

// action creators
export const setUserAC = (user: UserDataType) =>
  ({
    type: 'profile/SET_USER',
    user,
  } as const)

// thunks creators
export const updateUserTC =
  (user: UserDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.updateUser(user.name, user.avatar)

      dispatch(setUserAC(res.data.updatedUser))
      console.log(res.data.updatedUser)
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
      //dispatch(setAppErrorAC(e.response.data.error))
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.logout()
    dispatch(setIsLoggedInAC(false))
    dispatch(setSuccess(false)) ///???????
  } catch (e) {
    serverErrorHandler(e as AxiosError | Error, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

// types
type initialStateType = typeof initialState
