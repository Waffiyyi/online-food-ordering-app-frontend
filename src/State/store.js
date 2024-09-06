import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "./Authenthication/Reducer.js";
import {thunk} from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer.js";
import menuItemReducer from "./Menu/Reducer.js";
import cartReducer from "./Cart/Reducer.js";
import orderReducer from "./Order/Reducer.js";
import restaurantOrderReducer from "./RestaurantOrder/Reducer.js";
import ingredientReducer from "./Ingredients/Reducer.js";
import {errorReducer} from "./Error/Reducer.js";

const rootReducer = combineReducers(
  {
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantOrderReducer,
    ingredients: ingredientReducer,
    error: errorReducer,
  });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));