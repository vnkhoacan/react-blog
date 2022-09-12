import * as types from '../constants';
import PostService from '../services/post.service';

export const getAllPosts = () => async (dispatch) => {
    try {
        const res = await PostService.getAll();

        dispatch({
            type: types.GET_ALL_POSTS,
            payload: res.data.data,
        })

    } catch (err) {
        console.log(err);
    }
}