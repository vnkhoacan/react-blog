import { REGISTER_SUCCESS, REGISTER_FAIL } from "../constants";

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
        default:
            return state
    }
}

export default authReducer
