import {
  AnyAction,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {
  appReducer,
  SetAppErrorActionType,
  SetAppInitializedActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from './app-reducer'
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
import { profileReducer, setUserAC, updateUserAC } from '../features/auth/Profile/profile-reducer'
import {
  newPasswordRequestStatusAC,
  passwordRecoveryReducer,
  recoveryRequestStatusAC,
  setRecoveryEmailAC,
} from '../features/auth/Recovery/PasswordRecovery/passwordRecovery-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  passwordRecovery: passwordRecoveryReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export type ActionsType =
  | ReturnType<typeof updateUserAC>
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
  | ReturnType<typeof recoveryRequestStatusAC>
  | ReturnType<typeof newPasswordRequestStatusAC>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, ActionsType>

export default store
