import * as actionType from "./ActionType";

const initialState = {
    ingredients: [],
    update: null,
    category: [],
    error: null,
    loading: false
};

const ingredientReducer = (state = initialState, action) =>{
    switch (action.type){
        case actionType.GET_INGREDIENTS_REQUEST:
        case actionType.CREATE_INGREDIENT_REQUEST:
        case actionType.CREATE_INGREDIENT_CATEGORY_REQUEST:
        case actionType.GET_INGREDIENT_CATEGORY_REQUEST:
        case actionType.UPDATE_STOCK_REQUEST:
            return{
                ...state,
                loading: true,
                error: null
            };
        case actionType.GET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.payload,
                loading: false,
            };
        case actionType.GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
            };
        case actionType.CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                category: [...state.category, action.payload],
            };

        case actionType.CREATE_INGREDIENT_SUCCESS:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        case actionType.UPDATE_STOCK:
            return {
                ...state,
                update: action.payload,
                ingredients: state.ingredients.map((item)=>
                    item.id === action.payload.id ? action.payload : item),
            };

        case actionType.GET_INGREDIENTS_FAILURE:
        case actionType.CREATE_INGREDIENT_FAILURE:
        case actionType.CREATE_INGREDIENT_CATEGORY_FAILURE:
        case actionType.GET_INGREDIENT_CATEGORY_FAILURE:
        case actionType.UPDATE_STOCK_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default ingredientReducer;