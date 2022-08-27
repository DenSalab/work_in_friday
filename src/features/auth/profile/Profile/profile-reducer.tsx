import { authAPI, UserDataType } from '../../../../api/api'

import { setAppErrorAC, setAppStatusAC } from '../../../../app/app-reducer'
import { setIsLoggedInAC } from '../../auth-reducer'
import { setSuccess } from '../../login/login-reducer'
import { ActionsType, AppThunk } from '../../../../app/store'

const SET_USER = 'profile/SET_USER'
const UPDATE_USER = 'profile/UPDATE_USER'
const initialState = {
  user: {} as UserDataType,
}

export const profileReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user }
    case UPDATE_USER:
      console.log(state)

      return { ...state, user: action.updateUser }
    default:
      return state
  }
}

export const setUserAC = (user: UserDataType) =>
  ({
    type: SET_USER,
    user,
  } as const)
export const updateUserAC = (updateUser: UserDataType) =>
  ({
    type: UPDATE_USER,
    updateUser,
  } as const)

export const getUserTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .getUser()
    .then((res) => {
      dispatch(setUserAC(res.data))
    })
    .catch((err) => {
      dispatch(setAppErrorAC(err.response.data.error))
      console.log(err.response.data.error)
    })
    .finally(() => {
      dispatch(setAppStatusAC('succeeded'))
    })
}
export const updateUserTC =
  (user: UserDataType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .updateUser(user.name, user.avatar)
      .then((res) => {
        dispatch(updateUserAC(res.data.updatedUser))
        console.log(res.data.updatedUser)
      })
      .catch((err) => {
        dispatch(setAppErrorAC(err.response.data.error))
        console.log(err.response.data.error)
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(() => {
      console.log('Logout')
      // dispatch(clearUserData())
      dispatch(setIsLoggedInAC(false))
      dispatch(setSuccess(false))
    })
    .catch((e) => {
      console.log(e.response.data.error)
    })
    .finally(() => {
      dispatch(setAppStatusAC('succeeded'))
    })
}
type initialStateType = typeof initialState
