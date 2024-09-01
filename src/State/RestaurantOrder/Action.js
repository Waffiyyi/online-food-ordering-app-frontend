import {api} from "../../Config/api.js";
import {
    GET_RESTAURANT_ORDER_FAILURE,
    GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType.js";

export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_ORDER_STATUS_REQUEST});
        try {
            const response = await api.put(`/api/admin/order/status?orderId=${orderId}&orderStatus=${orderStatus}`, {},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("update order status", response.data)
            dispatch({type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("", error)
            dispatch({type: UPDATE_ORDER_STATUS_FAILURE, payload: error})
        }
    }
}

export const fetchRestaurantOrder = ({restaurantId, orderStatus, jwt}) => {
    return async (dispatch) => {
        dispatch({type: GET_RESTAURANT_ORDER_REQUEST});
        try {
            const {data} = await api.get(`api/admin/order/restaurant/get-history?restaurantId=${restaurantId}&orderStatus=${orderStatus}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("restaurant order", data)
            dispatch({type: GET_RESTAURANT_ORDER_SUCCESS, payload: data})
        } catch (error) {
            console.log("", error)
            dispatch({type: GET_RESTAURANT_ORDER_FAILURE, payload: error})
        }
    }
}
