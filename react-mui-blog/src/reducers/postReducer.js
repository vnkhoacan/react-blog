import {
    GET_ALL_POSTS, GET_POST, IS_FETCH_POST
} from '../constants';

const initialState = {
    posts: [],
    post: {},
    isFetching: false,
    currentPost: {}
}

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload,
                isFetching: false
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                isFetching: false
            }
        case IS_FETCH_POST:
            return {
                ...state,
                isFetching: true
            }
        default:
            return state
    }
}

export default postReducer