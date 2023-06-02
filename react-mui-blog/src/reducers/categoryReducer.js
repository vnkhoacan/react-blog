import { GET_ALL_CATEGORY } from "../constants";

const initialState = {
    categories: [],
};

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_CATEGORY:
            return {
                ...state,
                categories: action.payload,
            }
        default:
            return state
    }
}

export default categoryReducer