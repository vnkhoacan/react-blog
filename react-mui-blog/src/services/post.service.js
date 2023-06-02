import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/posts"

const getAll = () => {
    return axios.get(API_URL);
}

const getOne = (id) => {
    return axios.get(API_URL + "/" + id, { headers: authHeader()})
}

const getMy = () => {
    return axios.get(API_URL + "/my-post", { headers: authHeader()})
}

const create = (data) => {
    return axios.post(API_URL, data, { headers: authHeader()})
}

const update = (data, id) => {
    return axios.put(API_URL + "/" + id, data, { headers: authHeader()})
}

const destroy = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader()})
}

const PostService = {
    getAll,
    getOne,
    getMy,
    create,
    update,
    destroy,
}

export default PostService