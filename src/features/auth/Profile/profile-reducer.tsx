import { authAPI, UserDataType } from '../../../api/authAPI'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { ActionsType, AppThunk } from '../../../app/store'
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

/*export const updateUserAC = (updateUser: UserDataType) =>
  ({
    type: 'profile/UPDATE_USER',
    updateUser,
  } as const)*/

// thunks creators

export const updateUserTC =
  (user: UserDataType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.updateUser(user.name, user.avatar)

      dispatch(setUserAC(res.data.updatedUser))
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
    await authAPI.logout()

    dispatch(setIsLoggedInAC(false))
    dispatch(setSuccess(false)) ///???????
  } catch (e: any) {
    //need to fix any
  } finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

// types
type initialStateType = typeof initialState
