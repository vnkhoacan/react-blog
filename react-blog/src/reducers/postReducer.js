import {
    GET_ALL_POSTS, GET_POST
} from '../constants';

const initialState = {
    posts: [],
    isFetchingPosts: true,
    currentPost: {}
}

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload,
                isFetchingPosts: false
            }
        case GET_POST:
            return {
                ...state,
                currentPost: action.payload
            }
        default:
            return state
    }
}

export default postReducer