import * as actionTypes from "./ActionType";

const initialState = {
    loading: false,
    orders: false,
    error: null,
  //  notification: []
};

const orderReducer = (state = initialState, action)=>{
    switch (action.type){
        case actionTypes.GET_USER_ORDER_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.GET_USER_ORDER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                orders: action.payload
            }

        case actionTypes.GET_USER_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }

}

export default orderReducer;