import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/categories";

const getAll = () => {
    return axios.get(API_URL);
}

const CategoryService = {
    getAll,
}

export default CategoryService