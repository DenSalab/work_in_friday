import { authAPI, UserDataType } from '../../../api/api'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { setIsLoggedInAC } from '../auth-reducer'
import { setSuccess } from '../Login/login-reducer'
import { ActionsType, AppThunk } from '../../../app/store'

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
    case 'profile/UPDATE_USER':
      return { ...state, user: action.updateUser }
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
export const updateUserAC = (updateUser: UserDataType) =>
  ({
    type: 'profile/UPDATE_USER',
    updateUser,
  } as const)

// thunks creators
export const getUserTC = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.getUser()
    dispatch(setUserAC(res.data))
  } catch (e: any) {
    // need to fix any
    dispatch(setAppErrorAC(e.response.data.error))
    console.log(e.response.data.error)
  } finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const updateUserTC =
  (user: UserDataType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await authAPI.updateUser(user.name, user.avatar)
      dispatch(updateUserAC(res.data.updatedUser))
      console.log(res.data.updatedUser)
    } catch (e: any) {
      //need to fix any
      dispatch(setAppErrorAC(e.response.data.error))
    } finally {
      dispatch(setAppStatusAC('succeeded'))
    }
  }

export const logoutTC = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = authAPI.logout()
    dispatch(setIsLoggedInAC(false))
    dispatch(setSuccess(false))
  } catch (e: any) {
    //need to fix any
  } finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

// types
type initialStateType = typeof initialState
