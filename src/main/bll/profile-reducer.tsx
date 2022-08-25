import { AppRootStateType } from './store'
import { ThunkAction } from 'redux-thunk'
import { setAppErrorAC, SetAppErrorActionType } from './app-reducer'
import { authAPI, UserDataType } from '../dal/api'

const SET_USER = 'profile/SET_USER'
const UPDATE_USER = 'profile/UPDATE_USER'
const initialState: initialStateType = {
    // в момент регистрации мы не имеем никаких данных
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
      return {  ...action.updateUser }
    default:
      return state
  }
}

// set, потому, что сетаем юзера в стор
// получаем юзера целикома
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

// get - потому, что получаем его с сервера
export const getUserTC = (): AppThunk => (dispatch) => {
  authAPI
    .getUser()
    .then((res) => {
      dispatch(setUserAC(res.data))
    })
    .catch((err) => {
      dispatch(setAppErrorAC(err.response.data.error))
      console.log(err.response.data.error)
    })
}
export const updateUserTC =
  (user: UserDataType): AppThunk =>
  (dispatch) => {
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
  }

type initialStateType = {
  user: UserDataType
}
type ActionsType =
  | ReturnType<typeof updateUserAC>
  | ReturnType<typeof setUserAC>
  | SetAppErrorActionType
type AppThunk = ThunkAction<void, AppRootStateType, unknown, ActionsType>
