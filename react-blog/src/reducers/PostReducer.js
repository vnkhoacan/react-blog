import {
    GET_ALL_POSTS
} from '../constants';

const initialState = {
    posts: [],
    isFetchingPosts: true
}

const PostReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload,
                isFetchingPosts: false
            }
        default:
            return state
    }
}

export default PostReducer