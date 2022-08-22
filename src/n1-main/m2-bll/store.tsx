import {
  AnyAction,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { mainReducer } from './mainReducer'
import { loginReducer } from './loginReducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'

const rootReducer = combineReducers({
  main: mainReducer,
  login: loginReducer,
  app: appReducer,
  auth: authReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export default store
