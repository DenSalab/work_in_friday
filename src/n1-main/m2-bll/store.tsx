import {createStore,combineReducers, applyMiddleware} from "redux";
import {mainReducer} from "./mainReducer";
import {loginReducer} from "./loginReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    main: mainReducer,
    login: loginReducer,
})
const store =  createStore(rootReducer, applyMiddleware(thunk))
export default store;