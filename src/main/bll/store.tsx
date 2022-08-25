import {
  AnyAction,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { loginReducer } from './login-reducer'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'
import { profileReducer } from './profile-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export default store
