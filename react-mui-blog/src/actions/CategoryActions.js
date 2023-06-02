import * as types from "../constants/";
import CategoryService from "../services/category.service";

export const getAllCategory = () => async (dispatch) => {
    try {
        const res = await CategoryService.getAll();

        dispatch({
            type: types.GET_ALL_CATEGORY,
            payload: res.data.data,
        })

    } catch (err) {
        console.log(err);
    }
}