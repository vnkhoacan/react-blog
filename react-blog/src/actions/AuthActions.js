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
export const login = ({email, password}) => async(dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: {user:data}
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
                type:types.LOGIN_FAIL
            })

            dispatch({
                type:types.SET_MESSAGE,
                payload: message
            })

            return Promise.reject()
        }
    )
}

export const logout = () => {
    AuthService.logout()
    return ({
        type:types.LOGOUT
    })
}

export const getUser = () => {
    const user = localStorage.getItem("user");
    return ({
        type: types.GET_USER,
        payload: user
    })
}
