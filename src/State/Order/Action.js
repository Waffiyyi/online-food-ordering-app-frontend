import {api} from "../../Config/api.js";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, GET_USER_ORDER_FAILURE,
    GET_USER_ORDER_REQUEST, GET_USER_ORDER_SUCCESS
} from "./ActionType.js";
import {handleError} from "../Error/Reducer.js";
import {clearCart} from "../Cart/Action.js";

export const createOrder = (reqData, addressId) => {
    let createOrderUrl = ""
    if(addressId){
        createOrderUrl  = `api/order/create?addressId=${addressId}`
    }
    else createOrderUrl = "api/order/create"
    return async (dispatch) => {
        dispatch({type: CREATE_ORDER_REQUEST});
        try {
            const {data} = await api.post(`${createOrderUrl}`, reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                },
            });
            console.log("created order data", data)
            dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
            if(data.payment_url) {
                window.location.href = data.payment_url;
                // dispatch(clearCart())
            }

        } catch (error) {
            console.log("", error)
            dispatch(handleError(CREATE_ORDER_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}

export const getUsersOrder = (jwt) => {
    return async (dispatch) => {
        dispatch({type: GET_USER_ORDER_REQUEST});
        try {
            const {data} = await api.get("api/order/get-history", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });

            console.log("user order data", data)
            dispatch({type: GET_USER_ORDER_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch(handleError(GET_USER_ORDER_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}