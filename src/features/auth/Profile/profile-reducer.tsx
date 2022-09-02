import { AxiosError } from 'axios'

import { authAPI, UserDataType } from '../../../api/authAPI'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { ActionsType, AppThunk } from '../../../app/store'
import { serverErrorHandler } from '../../../common/utils/serverErrorHandler'
import { setIsLoggedInAC } from '../auth-reducer'
import { setSuccess } from '../Login/login-reducer'

const initialState = {
  user: {
    _id: '5eecf82a3ed8f700042f1186',
    rememberMe: true,
  } as UserDataType,
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
    try {
      dispatch(setAppErrorAC(null))
      dispatch(setAppStatusAC('loading'))
      const res = await authAPI.updateUser(user.name, user.avatar)

      dispatch(setUserAC(res.data.updatedUser))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setAppErrorAC(null))
    dispatch(setAppStatusAC('loading'))
    await authAPI.logout()
    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC('succeeded'))
    dispatch(setSuccess(false)) ///???????
  } catch (e) {
    serverErrorHandler(e as AxiosError | Error, dispatch)
  }
}

// types
type initialStateType = typeof initialState
