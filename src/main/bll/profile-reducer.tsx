import { profileAPI, UserType } from '../../feature/Profile/profileAPI'
import { AppRootStateType } from './store'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../dal/api'
import { setAppErrorAC, SetAppErrorActionType } from './app-reducer'

const SET_USER = 'profile/SET_USER'
const UPDATE_USER = 'profile/UPDATE_USER'
const initialState: initialStateType = {
  user: {
    _id: null,
    email: 'qwerty@gmail.com',
    name: 'test',
    avatar: 'avatar must be here',
    publicCardPacksCount: 1,
    created: null,
    updated: null,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: null,
  },
}

export const profileReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user }
    case UPDATE_USER:
      return { ...state, user: { ...state.user, name: action.name, avatar: action.avatar } }
    default:
      return state
  }
}

export const setUserAC = (user: UserType) =>
  ({
    type: SET_USER,
    user,
  } as const)
export const updateUserAC = (name: string, avatar: string) =>
  ({
    type: UPDATE_USER,
    name,
    avatar,
  } as const)

export const setUserTC = (): AppThunk => (dispatch) => {
  profileAPI
    .setUser()
    .then((res) => {
      dispatch(setUserAC(res.data.updatedUser))
    })
    .catch((err) => {
      dispatch(setAppErrorAC(err.response.data.error))
      console.log(err.response.data.error)
    })
}
export const updateUserTC =
  (user: UserType): AppThunk =>
  (dispatch) => {
    profileAPI
      .updateUser(user.name, user.avatar)
      .then((res) => {
        dispatch(updateUserAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
        console.log(res.data.updatedUser)
      })
      .catch((err) => {
        dispatch(setAppErrorAC(err.response.data.error))
        console.log(err.response.data.error)
      })
  }

type initialStateType = {
  user: UserType
}
type ActionsType =
  | ReturnType<typeof updateUserAC>
  | ReturnType<typeof setUserAC>
  | SetAppErrorActionType
type AppThunk = ThunkAction<void, AppRootStateType, unknown, ActionsType>
