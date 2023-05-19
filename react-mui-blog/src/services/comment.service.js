import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/comments"

const create = (data) => {
    return axios.post(API_URL, data, { headers: authHeader()})
}

const destroy = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader()})
}

const CommentService = {
    create,
    destroy,
}

export default CommentService