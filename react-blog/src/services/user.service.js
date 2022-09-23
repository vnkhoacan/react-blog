import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users"

const getOne = (id) => {
    return axios.get(API_URL + "/" +id)
}

const UserService = {
    getOne,
}

export default UserService