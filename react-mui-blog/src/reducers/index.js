import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";

const reducer = combineReducers({
    post: postReducer,
    auth: authReducer,
    message: messageReducer,
})

export default reducer