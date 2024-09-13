import { api } from "../../Config/api.js";
import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_SUCCESS,
  GET_ALL_EVENT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_EVENT_REQUEST,
  GET_RESTAURANT_EVENT_SUCCESS,
  GET_RESTAURANT_EVENT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  SEARCH_RESTAURANT_REQUEST,
  SEARCH_RESTAURANT_SUCCESS,
  SEARCH_RESTAURANT_FAILURE,
} from "./ActionType.js";
import { handleError } from "../Error/Reducer.js";
import {data} from "autoprefixer";

export const getAllRestaurantAction = (token) => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
  try {
    const { data } = await api.get("/api/restaurant/get-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {

    dispatch(handleError(GET_ALL_RESTAURANT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const getRestaurantById = (reqData) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
  try {
    const response = await api.get(`api/restaurant/get?restaurantId=${reqData.restaurantId}`, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });

  } catch (error) {
    dispatch(handleError(GET_RESTAURANT_BY_ID_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
  try {
    const { data } = await api.get(`api/admin/restaurant/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch(handleError(GET_RESTAURANT_BY_USER_ID_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const createRestaurant = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });
  try {
    const { data } = await api.post(`api/admin/restaurant/create`, reqData.data, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch(handleError(CREATE_RESTAURANT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_REQUEST });
  try {
    const res = await api.put(`api/admin/restaurant/update?restaurantId=${restaurantId}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(handleError(UPDATE_RESTAURANT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const deleteRestaurant = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: DELETE_RESTAURANT_REQUEST });
  try {
    const res = await api.delete(`api/admin/restaurant/delete?restaurantId=${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
  } catch (error) {
    dispatch(handleError(DELETE_RESTAURANT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
  try {
    const res = await api.put(`api/admin/restaurant/update-status?restaurantId=${restaurantId}`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(handleError(UPDATE_RESTAURANT_STATUS_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const createEvent = ({ requestData }) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  try {
    const res = await api.post(`api/admin/events/create-event?restaurantId=${requestData.restaurantId}`, requestData.data, {
      headers: {
        Authorization: `Bearer ${requestData.jwt}`,
      },
    });
    dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
    dispatch(getRestaurantEvents({ restaurantId: requestData.restaurantId, jwt: requestData.jwt }));
  } catch (error) {
    dispatch(handleError(CREATE_EVENT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const getAllEvent = ({ jwt }) => async (dispatch) => {
  dispatch({ type: GET_ALL_EVENT_REQUEST });
  try {
    const res = await api.get(`api/events/get-all`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_ALL_EVENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(handleError(GET_ALL_EVENT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const deleteEvent = ({ eventId, jwt }) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  try {
    const res = await api.delete(`api/admin/events/delete-event?eventId=${eventId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
  } catch (error) {
    dispatch(handleError(DELETE_EVENT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_EVENT_REQUEST });
  try {
    const res = await api.get(`api/admin/events/get-restaurant-events?restaurantId=${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_RESTAURANT_EVENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(handleError(GET_RESTAURANT_EVENT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const createCategory = ({ reqData, jwt }) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });
  try {
    const res = await api.post(`/api/admin/category/create`, reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(handleError(CREATE_CATEGORY_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};

export const getRestaurantCategory = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
  try {
    const res = await api.get(`/api/category/restaurant?restaurantId=${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });

  } catch (error) {
    dispatch(handleError(GET_RESTAURANT_CATEGORY_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};


export const searchRestaurant = (keyword, jwt) => async (dispatch) => {
  dispatch({ type: SEARCH_RESTAURANT_REQUEST });
  try {
    const res = await api.get(`/api/restaurant/search?keyword=${keyword}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: SEARCH_RESTAURANT_SUCCESS, payload: res.data });

  } catch (error) {
    dispatch(handleError(SEARCH_RESTAURANT_FAILURE, error.response.data.errorMessage ||error.response?.data?.message || error.message));
  }
};