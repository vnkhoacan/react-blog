import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/posts"

const getAll = () => {
    return axios.get(API_URL);
}

const getOne = (id) => {
    return axios.get(API_URL + "/" + id)
}

const getMy = () => {
    return axios.get(API_URL + "/my-post", { headers: authHeader()})
}

const create = (data) => {
    return axios.post(API_URL, data, { headers: authHeader()})
}

const destroy = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader()})
}

const PostService = {
    getAll,
    getOne,
    getMy,
    create,
    destroy,
}

export default PostService