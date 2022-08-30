import {
  AnyAction,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
  authReducer,
  setIsLoggedInAC,
  setIsRegisteredAC,
  setServerErrorAC,
} from '../features/auth/auth-reducer'
import {
  loginReducer,
  setError,
  setLoading,
  setSuccess,
} from '../features/auth/Login/login-reducer'
import { profileReducer, setUserAC } from '../features/auth/Profile/profile-reducer'
import {
  passwordRecoveryReducer,
  setRecoveryEmailAC,
} from '../features/auth/Recovery/PasswordRecovery/passwordRecovery-reducer'
import {
  cardsReducer,
  searchCardsAC,
  setCardsAC,
  setPageAC,
  setPageCountAC,
  setSearchedAnswerAC,
} from '../features/cards/cards-reducer'
import {
  packsReducer,
  setCardPacks,
  setMaxCardsCount,
  setMinCardsCount,
  setOnlyMyPacks,
  setPacksTotalCount,
  setPage,
  setPageCount,
  setSearchedPackName,
} from '../features/packs/packs-reducer'

import {
  appReducer,
  SetAppErrorActionType,
  SetAppInitializedActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from './app-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  passwordRecovery: passwordRecoveryReducer,
  packs: packsReducer,
  cards: cardsReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export type ActionsType =
  | SetAppErrorActionType
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppInitializedActionType
  | ReturnType<typeof setIsRegisteredAC>
  | ReturnType<typeof setServerErrorAC>
  | ReturnType<typeof setError>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setSuccess>
  | ReturnType<typeof setUserAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setRecoveryEmailAC>
  | ReturnType<typeof setSearchedPackName>
  | ReturnType<typeof setOnlyMyPacks>
  | ReturnType<typeof setPage>
  | ReturnType<typeof setPageCount>
  | ReturnType<typeof setPacksTotalCount>
  | ReturnType<typeof setMinCardsCount>
  | ReturnType<typeof setMaxCardsCount>
  | ReturnType<typeof setCardPacks>
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setSearchedAnswerAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>

export type AppThunk = ThunkAction<void, AppRootStateType, unknown, ActionsType>

export default store
