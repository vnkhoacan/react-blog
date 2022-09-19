import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, GET_USER, LOGOUT } from "../constants";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { isLoggedIn: true, user}
    : { isLoggedIn: false, user: null};
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        case GET_USER:
            return {
                ...state,
                isLoggedIn: action.payload ? true : false,
                user: JSON.parse(action.payload)
            }
        default:
            return state
    }
}

export default authReducer
