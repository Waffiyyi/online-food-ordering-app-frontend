import * as actionType from "./ActionType";
import {
    GET_RESTAURANT_ORDER_FAILURE,
    GET_RESTAURANT_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    orders: []
};

const restaurantOrderReducer = (state = initialState, action)=>{
    switch (action.type){
        case actionType.GET_RESTAURANT_ORDER_REQUEST:
        case actionType.UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_RESTAURANT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case UPDATE_ORDER_STATUS_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            const updatedOrders = state.orders.map((order)=>
                order.id === action.payload.id? action.payload: order
            );
            return {
                ...state,
                loading: false,
                orders: updatedOrders,
            };

        case GET_RESTAURANT_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state
    }
};

export default restaurantOrderReducer;

