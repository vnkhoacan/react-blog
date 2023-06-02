import { LOGIN_SUCCESS, LOGIN_FAIL, GET_USER, LOGOUT } from "../constants";

const initialState = {
    isLogin: false,
    user: null,
};
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLogin: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                user: null,
            }
        case GET_USER:
            return {
                ...state,
                isLogin: action.payload ? true : false,
                user: action.payload.user
            }
        default:
            return state
    }
}

export default authReducer
