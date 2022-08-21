import { profileAPI, UserType } from '../../n2-feature/Profile/profileAPI'
import { Dispatch } from 'react'
const UPDATE_USER = 'UPDATE_USER'
const initialState: UserType = {
  _id: '1234',
  email: '123@mail.ru',
  avatar: '',
  name: 'test name',
  publicCardPacksCount: 1,
  created: null,
  updated: null,
  isAdmin: true,
  verified: true,
  rememberMe: true,
  error: '',
}
export const profileReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): UserType => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, name: action.name, avatar: action.avatar }
    default:
      return state
  }
}

export const updateUserAC = (name: string, avatar: string | undefined) =>
  ({
    type: UPDATE_USER,
    name,
    avatar,
  } as const)
export const updateUserTC = (name: string, avatar: string) => (dispatch: Dispatch<any>) => {
  profileAPI
    .updateUser(name, avatar)
    .then((res) => {
      dispatch(updateUserAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
    })
    .catch((err) => {
      console.log(err.response.data.error)
    })
}

type initialStateType = UserType
type ActionsType = ReturnType<typeof updateUserAC>
