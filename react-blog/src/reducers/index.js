import { combineReducers } from "redux";
import PostReducer from "../reducers/PostReducer";
import AuthReducer from "../reducers/AuthReducer";

const reducer = combineReducers({
    PostReducer,
    AuthReducer
})

export default reducer