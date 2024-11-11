import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    INITIATE_RESET_PASSWORD_FAILURE,
    INITIATE_RESET_PASSWORD_REQUEST, INITIATE_RESET_PASSWORD_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS, RESET_PASSWORD_SUCCESS_MESSAGE,
} from "./ActionType.js";
import {isPresentInFavorites} from "../../Config/logic.js";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites:[],
    success:null,
    successMessage: "",
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
        case INITIATE_RESET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Register Success",
            };

        case INITIATE_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "Password reset initiated. Check your email.",
                error: null,
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "Password reset successful.",
                error: null,
            };
        case RESET_PASSWORD_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.payload,
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                favorites: action.payload.user.favourites,
            };

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                favorites: isPresentInFavorites(state.favorites, action.payload)
                  ? state.favorites.filter((item) => item.id !== action.payload.id)
                  : [action.payload, ...state.favorites],
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
        case INITIATE_RESET_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};