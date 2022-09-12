import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8000/api/auth/";

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {email, password})
        .then((response) => {
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data
        })
}

const logout = () => {
    localStorage.removeItem("user")
}

const register = (name, email, password, password_confirmation) => {
    return axios.post(API_URL + "register", {
        name,
        email,
        password,
        password_confirmation
    })
}

const user = () => {
    return axios.get(API_URL + "user", { headers: authHeader()})
}

const AuthService = {
    login,
    logout,
    register,
    user
}

export default AuthService