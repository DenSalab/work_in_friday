import { createStore, combineReducers, applyMiddleware } from 'redux'
import { mainReducer } from './mainReducer'
import { loginReducer } from './loginReducer'
import thunk from 'redux-thunk'
import { profileReducer } from './profileReducer'
const rootReducer = combineReducers({
  main: mainReducer,
  login: loginReducer,
  profile: profileReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export default store
