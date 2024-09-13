import {api} from "../../Config/api.js";
import {
    GET_RESTAURANT_ORDER_BY_STATUS_FAILURE,
    GET_RESTAURANT_ORDER_BY_STATUS_REQUEST,
    GET_RESTAURANT_ORDER_BY_STATUS_SUCCESS,
    GET_RESTAURANT_ORDER_FAILURE,
    GET_RESTAURANT_ORDER_REQUEST,
    GET_RESTAURANT_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType.js";
import {handleError} from "../Error/Reducer.js";
import {CREATE_ORDER_FAILURE} from "../Order/ActionType.js";

export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_ORDER_STATUS_REQUEST});
        try {
            const response = await api.put(`/api/order/status?orderId=${orderId}&orderStatus=${orderStatus}`, {},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data})
        } catch (error) {
            dispatch(handleError(UPDATE_ORDER_STATUS_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}

export const fetchRestaurantOrder = ({restaurantId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: GET_RESTAURANT_ORDER_REQUEST});
        try {
            const {data} = await api.get(`api/admin/order/restaurant/get-history?restaurantId=${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type: GET_RESTAURANT_ORDER_SUCCESS, payload: data})
        } catch (error) {
            dispatch(handleError(GET_RESTAURANT_ORDER_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}

export const fetchRestaurantOrderByStatus = ({restaurantId, orderStatus, jwt}) => {
    return async (dispatch) => {
        dispatch({type: GET_RESTAURANT_ORDER_BY_STATUS_REQUEST});
        try {
            const {data} = await api.get(`api/admin/order/restaurant/get-history-from-status?restaurantId=${restaurantId}&orderStatus=${orderStatus}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type: GET_RESTAURANT_ORDER_BY_STATUS_SUCCESS, payload: data})
        } catch (error) {
            dispatch(handleError(GET_RESTAURANT_ORDER_BY_STATUS_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
        }
    }
}
