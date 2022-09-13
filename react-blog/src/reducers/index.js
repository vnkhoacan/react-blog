import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import { reducer as formReducer } from "redux-form";

const reducer = combineReducers({
    form: formReducer,
    post: postReducer,
    auth: authReducer,
    message: messageReducer,
})

export default reducer