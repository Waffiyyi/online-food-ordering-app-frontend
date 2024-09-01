import {api} from "../../Config/api.js";
import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS
} from "./ActionType.js";


export const findCart = (jwt) => {
    return async (dispatch) => {
        dispatch({type: FIND_CART_REQUEST});
        try {
            const response = await api.get(`/api/cart/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("find cart ", response.data)
            dispatch({type: FIND_CART_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("error", error)
            dispatch({type: FIND_CART_FAILURE, payload: error})
        }
    }
}

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({type: GET_ALL_CART_ITEMS_REQUEST});
        try {
            const response = await api.get(`/api/cart?cartId=${reqData.cartId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                },
            });
            console.log("get all cart items", response.data)
            dispatch({type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("error", error)
            dispatch({type: GET_ALL_CART_ITEMS_FAILURE, payload: error})
        }
    }
}

export const addItemToCart = (reqData) => {
    return async (dispatch, getState) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                },
            });

            const cartItems = getState().cart.cartItems;
            const existingItem = cartItems.find(item => item.food.id === data.food.id);

            const isNewItem = !existingItem;
            const actionType = isNewItem ? ADD_ITEM_TO_CART_SUCCESS : UPDATE_CART_ITEM_SUCCESS;

            dispatch({ type: actionType, payload: data });

            return { isNewItem: isNewItem };
        } catch (error) {
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
        }
    }
}

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_CART_ITEM_REQUEST});
        try {
            const {data} = await api.put(`/api/cart-item/update`,reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                },
            });
            console.log("update cart items", data)
            dispatch({type: UPDATE_CART_ITEM_SUCCESS, payload: data})
        } catch (error) {
            console.log("error", error)
            dispatch({type: UPDATE_CART_ITEM_FAILURE, payload: error})
        }
    }
}

export const removeCartItem = ({cartItemId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: REMOVE_CART_ITEM_REQUEST});
        try {
            const {data} = await api.delete(`/api/cart-item/remove?cartItemId=${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("remove cart items", data)
            dispatch({type: REMOVE_CART_ITEM_SUCCESS, payload: data})
        } catch (error) {
            console.log("error", error)
            dispatch({type: REMOVE_CART_ITEM_FAILURE, payload: error})
        }
    }
}

export const clearCart = () => {
    return async (dispatch) => {
        dispatch({type: CLEAR_CART_REQUEST});
        try {
            const {data} = await api.put(`/api/cart/clear`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
            });
            console.log("remove cart items", data)
            dispatch({type: CLEAR_CART_SUCCESS, payload: data})
        } catch (error) {
            console.log("error", error)
            dispatch({type: CLEAR_CART_FAILURE, payload: error})
        }
    }
}