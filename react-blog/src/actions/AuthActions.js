import * as types from "../constants/";
import AuthService from "../services/auth.service";

export const register = ({name, email, password, password_confirmation}) => async(dispatch) => {
    return AuthService.register(name, email, password, password_confirmation).then(
        (response) => {
            dispatch({
                type: types.REGISTER_SUCCESS
            })
            dispatch({
                type: types.SET_MESSAGE,
                payload: response.data.message
            })
            return Promise.resolve()
        },
        (error) => {
            const message = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: types.REGISTER_FAIL
            })
            dispatch({
                type: types.SET_MESSAGE,
                payload: message
            })
            return Promise.reject()
        }
    )
}
export const login = () => async(dispatch) => {
    try {

    } catch(err) {

    }
}
