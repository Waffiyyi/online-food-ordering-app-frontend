import {api} from "../../Config/api.js";
import {
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_SUCCESS,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    GET_INGREDIENTS, UPDATE_STOCK,
} from "./ActionType.js";

export const getIngredientsOfRestaurant = ({restaurantId, jwt}) => {
    return async (dispatch) => {
        //dispatch({type: FIND_CART_REQUEST});
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant?restaurantId=${restaurantId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("get all ingredients", response.data)
            dispatch({type: GET_INGREDIENTS, payload: response.data})
        } catch (error) {
            console.log("error", error)
          //  dispatch({type: FIND_CART_FAILURE, payload: error})
        }
    }
}


export const createIngredient = ({data, jwt}) => {
    return async (dispatch) => {
        //dispatch({type: FIND_CART_REQUEST});
        try {
            const response = await api.post(`/api/admin/ingredients/create-item`,data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("create ingredients", response.data)
            dispatch({type: CREATE_INGREDIENT_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("error", error)
            //  dispatch({type: FIND_CART_FAILURE, payload: error})
        }
    }
}


export const createIngredientCategory = ({data, jwt}) => {
    return async (dispatch) => {
        //dispatch({type: FIND_CART_REQUEST});
        try {
            const response = await api.post(`/api/admin/ingredients/create-category`,data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("create ingredients category", response.data)
            dispatch({type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("error", error)
            //  dispatch({type: FIND_CART_FAILURE, payload: error})
        }
    }
}


export const getIngredientCategory = ({id, jwt}) => {
    return async (dispatch) => {
        //dispatch({type: FIND_CART_REQUEST});
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant-category?restaurantId=${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("get ingredients category", response.data)
            dispatch({type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("error", error)
            //  dispatch({type: FIND_CART_FAILURE, payload: error})
        }
    }
}

export const updateStockOfIngredient= ({ingredientId, jwt}) => {
    return async (dispatch) => {
        //dispatch({type: FIND_CART_REQUEST});
        try {
            const {data} = await api.put(`/api/admin/ingredients/update-stock?ingredientId=${ingredientId}`, {},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("update ingredients stock", data)
            dispatch({type: UPDATE_STOCK, payload: data})
        } catch (error) {
            console.log("error", error)
            //  dispatch({type: FIND_CART_FAILURE, payload: error})
        }
    }
}