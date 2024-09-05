import {api} from "../../Config/api.js";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, GET_USER_ORDER_FAILURE,
    GET_USER_ORDER_REQUEST, GET_USER_ORDER_SUCCESS
} from "./ActionType.js";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({type: CREATE_ORDER_REQUEST});
        try {
            const {data} = await api.post("api/order/create", reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                },
            });
            if(data.payment_url) {
                window.location.href = data.payment_url;
            }
            console.log("created order data", data)
            dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch({type: CREATE_ORDER_FAILURE, payload: error})
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
            dispatch({type: GET_USER_ORDER_FAILURE, payload: error})
        }
    }
}