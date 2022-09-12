import * as types from "../constants/";
import AuthService from "../services/auth.service";

export const register = ({name, email, password, password_confirmation}) => async(dispatch) => {
    return AuthService.register(name, email, password, password_confirmation).then(
        (response) => {
            dispatch({
                type: types.REGISTER_SUCCESS
            })
            return Promise.resolve()
        },
        (error) => {
            dispatch({
                type: types.REGISTER_FAIL
            })
        }
    )
}
export const login = () => async(dispatch) => {
    try {

    } catch(err) {

    }
}
