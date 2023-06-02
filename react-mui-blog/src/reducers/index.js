import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import categoryReducer from "./categoryReducer";

const reducer = combineReducers({
    post: postReducer,
    auth: authReducer,
    message: messageReducer,
    category: categoryReducer,
})

export default reducer