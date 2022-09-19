import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/posts"

const getAll = () => {
    return axios.get(API_URL);
}

const getOne = (id) => {
    return axios.get(API_URL + "/" + id)
}

const PostService = {
    getAll,
    getOne,
}

export default PostService