import {
  CREATE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_FAILURE,
  GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_FAILURE,
  UPDATE_MENU_ITEM_AVAILABILITY_FAILURE,
} from "../Menu/ActionType.js";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_EVENT_FAILURE,
  CREATE_RESTAURANT_FAILURE, DELETE_EVENT_FAILURE,
  DELETE_RESTAURANT_FAILURE,
  GET_ALL_EVENT_FAILURE,
  GET_ALL_RESTAURANT_FAILURE,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_EVENT_FAILURE,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_FAILURE,
} from "../Restaurant/ActionType.js";
import {
  GET_RESTAURANT_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_FAILURE,
} from "../RestaurantOrder/ActionType.js";
import {
  CREATE_ORDER_FAILURE,
  GET_USER_ORDER_FAILURE,
} from "../Order/ActionType.js";
import {
  ADD_TO_FAVORITE_FAILURE,
  GET_USER_FAILURE,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
} from "../Authenthication/ActionType.js";
import {
  ADD_ITEM_TO_CART_FAILURE, CLEAR_CART_FAILURE,
  FIND_CART_FAILURE,
  GET_ALL_CART_ITEMS_FAILURE,
  REMOVE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_FAILURE,
} from "../Cart/ActionType.js";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_FAILURE, GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENTS_FAILURE, UPDATE_STOCK_FAILURE,
} from "../Ingredients/ActionType.js";


const initialState = {
  error: null,
};

export const handleError = (type, error) => {
  return (dispatch) => {
    dispatch({
      type,
      payload: error,
    });

      setTimeout(() => {
        dispatch({
          type: 'CLEAR_ERROR',
        });
      }, 3000);
    };
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MENU_ITEM_FAILURE:
    case DELETE_MENU_ITEM_FAILURE:
    case GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE:
    case GET_MENU_ITEM_FAILURE:
    case SEARCH_MENU_ITEM_FAILURE:
    case UPDATE_MENU_ITEM_AVAILABILITY_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case UPDATE_ORDER_STATUS_FAILURE:
    case GET_RESTAURANT_ORDER_FAILURE:
    case GET_RESTAURANT_BY_USER_ID_FAILURE:
    case CREATE_ORDER_FAILURE:
    case GET_USER_ORDER_FAILURE:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
    case GET_ALL_CART_ITEMS_FAILURE:
    case ADD_ITEM_TO_CART_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
    case FIND_CART_FAILURE:
    case REMOVE_CART_ITEM_FAILURE:
    case GET_INGREDIENTS_FAILURE:
    case CREATE_INGREDIENT_FAILURE:
    case CREATE_INGREDIENT_CATEGORY_FAILURE:
    case GET_INGREDIENT_CATEGORY_FAILURE:
    case UPDATE_STOCK_FAILURE:
    case GET_ALL_RESTAURANT_FAILURE:
    case GET_RESTAURANT_BY_ID_FAILURE:
    case GET_RESTAURANT_CATEGORY_FAILURE:
    case UPDATE_RESTAURANT_STATUS_FAILURE:
    case CREATE_EVENT_FAILURE:
    case GET_ALL_EVENT_FAILURE:
    case GET_RESTAURANT_EVENT_FAILURE:
    case DELETE_EVENT_FAILURE:

      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }



};

