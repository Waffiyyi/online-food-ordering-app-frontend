import {api} from "../../Config/api.js";
import {
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, GET_MENU_ITEM_FAILURE,
    GET_MENU_ITEM_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEM_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS,
} from "./ActionType.js";

export const createMenuItem = ({menu, jwt}) => {
    return async (dispatch) => {
        dispatch({type: CREATE_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.post("api/admin/food/create", menu, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("created menu", data)
            dispatch({type: CREATE_MENU_ITEM_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch({type: CREATE_MENU_ITEM_FAILURE, payload: error})
        }
    }
}

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST});
        try {
            const {data} = await api.get(`api/food/get-filter-foods?restaurantId=${reqData.restaurantId}&vegetarian=${reqData.vegetarian}&nonVeg=${reqData.nonveg}&seasonal=${reqData.seasonal}&foodCategory=${reqData.foodCategory}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log(reqData.restaurantId, "restaurantId")
            console.log("menu item by restaurants", data)
            dispatch({type: GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch({type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, payload: error})
        }
    }
}

export const getMenuItems = (reqData) => {
    return async (dispatch) => {
        dispatch({type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST});
        try {
            const {data} = await api.get(`api/food/get-foods?restaurantId=${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log(reqData.restaurantId, "restaurantId")
            console.log("menu item", data)
            dispatch({type: GET_MENU_ITEM_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch({type: GET_MENU_ITEM_FAILURE, payload: error})
        }
    }
}

export const searchMenuItem = ({keyword, jwt}) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.get(`api/food/search-food?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("search menu", data)
            dispatch({type: SEARCH_MENU_ITEM_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch({type: SEARCH_MENU_ITEM_FAILURE, payload: error})
        }
    }
}

// export const getAllIngredientsOfMenuItem = (reqData) => {
//     return async (dispatch) => {
//         dispatch({type: GETMENU_ITEM_REQUEST});
//         try {
//             const {data} = await api.get(`api/food/search?name=${keyword}`, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 },
//             });
//             console.log("search menu", data)
//             dispatch({type: GETMENU_ITEM_SUCCESS, payload: data})
//         } catch (error) {
//             console.log("", error)
//             dispatch({type: GETMENU_ITEM_FAILURE, payload: error})
//         }
//     }
// }

export const updateMenuItemAvailability = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_MENU_ITEM_AVAILABILITY_REQUEST});
        try {
            const {data} = await api.put(`/api/admin/food/update-availability?foodId=${foodId}`, {},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("update menu items availability", data)
            dispatch({type: UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch({type: UPDATE_MENU_ITEM_AVAILABILITY_FAILURE, payload: error})
        }
    }
}


export const deleteFood = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: DELETE_MENU_ITEM_REQUEST});
        try {
            const data = await api.delete(`/api/admin/food/delete?foodId=${foodId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("DELETE MENU", data)
            dispatch({type: DELETE_MENU_ITEM_SUCCESS, payload: foodId})
        } catch (error) {
            console.log("", error)
            dispatch({type: DELETE_MENU_ITEM_FAILURE, payload: error})
        }
    }
}


