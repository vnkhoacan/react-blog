import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/like"

const like = (data) => {
    return axios.post(API_URL, data, { headers: authHeader()})
}

const LikeService = {
    like,
}

export default LikeService