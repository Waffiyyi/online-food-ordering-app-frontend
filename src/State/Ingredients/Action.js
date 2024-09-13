import {api} from "../../Config/api.js";
import {
    CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST,
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST,
    CREATE_INGREDIENT_SUCCESS,
    GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_REQUEST,
    UPDATE_STOCK,
    UPDATE_STOCK_FAILURE, UPDATE_STOCK_REQUEST,
} from "./ActionType.js";
import {handleError} from "../Error/Reducer.js";
import {CLEAR_CART_FAILURE} from "../Cart/ActionType.js";
import {DELETE_RESTAURANT_REQUEST} from "../Restaurant/ActionType.js";

export const getIngredientsOfRestaurant = ({restaurantId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant?restaurantId=${restaurantId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type: GET_INGREDIENTS, payload: response.data})
        } catch (error) {
            dispatch(handleError(GET_INGREDIENTS_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));

        }
    }
}


export const createIngredient = ({data, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_REQUEST });

        try {
            const response = await api.post(`/api/admin/ingredients/create-item`,data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type: CREATE_INGREDIENT_SUCCESS, payload: response.data})
        } catch (error) {
            dispatch(handleError(CREATE_INGREDIENT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}


export const createIngredientCategory = ({data, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
        try {
            const response = await api.post(`/api/admin/ingredients/create-category`,data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data})
        } catch (error) {
            dispatch(handleError(CREATE_INGREDIENT_CATEGORY_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));

        }
    }
}


export const getIngredientCategory = ({id, jwt}) => {
    return async (dispatch) => {
        dispatch({ type:GET_INGREDIENT_CATEGORY_REQUEST });
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant-category?restaurantId=${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("get ingredients category", response.data)
            dispatch({type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data})
        } catch (error) {
            dispatch(handleError(GET_INGREDIENT_CATEGORY_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}

export const updateStockOfIngredient= ({ingredientId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_STOCK_REQUEST});

        try {
            const {data} = await api.put(`/api/admin/ingredients/update-stock?ingredientId=${ingredientId}`, {},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("update ingredients stock", data)
            dispatch({type: UPDATE_STOCK, payload: data})
        } catch (error) {
            dispatch(handleError(UPDATE_STOCK_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}