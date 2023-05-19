import * as types from "../constants/";
import AuthService from "../services/auth.service";
import { toast } from 'react-toastify';

export const register = ({name, email, password, password_confirmation}) => async(dispatch) => {
    return AuthService.register({name, email, password, password_confirmation}).then(
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
    return AuthService.login({email, password}).then(
        (data) => {
            toast.success('Login successful!');

            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: {user:data}
            })

            return Promise.resolve()
        },
        (error) => {
            toast.error(error.response.data.message);
            
            dispatch({
                type:types.LOGIN_FAIL
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

export const getUser = () => async(dispatch) => {
    AuthService.user().then(
        ({data}) => {
            dispatch({
                type: types.GET_USER,
                payload: {user:data}
            })

            return Promise.resolve()
        },
        (error) => {
            dispatch({
                type: types.LOGOUT
            })

            return Promise.resolve()
        }
    )
}
