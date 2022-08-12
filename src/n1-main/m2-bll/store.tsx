import {createStore,combineReducers } from "redux";
import {mainReducer} from "./mainReduser";

const rootReducer = combineReducers({
    main: mainReducer,
})
const store =  createStore(rootReducer)
export default store;