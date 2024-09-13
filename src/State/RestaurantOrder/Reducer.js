import * as actionType from "./ActionType";
import {LOGOUT} from "../Authenthication/ActionType.js";

const initialState = {
    loading: false,
    error: null,
    orders: []
};

const restaurantOrderReducer = (state = initialState, action)=>{
    switch (action.type){
        case actionType.GET_RESTAURANT_ORDER_REQUEST:
        case actionType.GET_RESTAURANT_ORDER_BY_STATUS_REQUEST:
        case actionType.UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionType.GET_RESTAURANT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case actionType.GET_RESTAURANT_ORDER_BY_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case actionType.UPDATE_ORDER_STATUS_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            const updatedOrders = state.orders.map((order)=>
                order.id === action.payload.id? action.payload: order
            );
            return {
                ...state,
                loading: false,
                orders: updatedOrders,
            };

        case actionType.GET_RESTAURANT_ORDER_FAILURE:
        case actionType.UPDATE_ORDER_STATUS_FAILURE:
        case actionType.GET_RESTAURANT_ORDER_BY_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case LOGOUT:
            return initialState;

        default:
            return state
    }
};

export default restaurantOrderReducer;

