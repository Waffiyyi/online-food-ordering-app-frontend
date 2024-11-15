import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  INITIATE_RESET_PASSWORD_FAILURE,
  INITIATE_RESET_PASSWORD_REQUEST,
  INITIATE_RESET_PASSWORD_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS_MESSAGE,
} from "./ActionType.js";
import axios from "axios";
import {api, API_URL} from "../../Config/api.js";
import {handleError} from "../Error/Reducer.js";
import {getAllRestaurantAction} from "../Restaurant/Action.js";

export const checkJwtExpiration = () => {
  const jwt = localStorage.getItem("jwt");
  const issueTime = localStorage.getItem("jwtIssueTime");

  if (jwt && issueTime) {
    const expiryTime = 23 * 60 * 60 * 1000;
    const currentTime = Date.now();

    if (currentTime - issueTime >= expiryTime) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("jwtIssueTime");
      console.log("JWT expired and has been removed.");
    }
  }
};

const clearJwt = (data) => {
  if (data.jwt) {
    const issueTime = Date.now();
    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("jwtIssueTime", issueTime);
    setTimeout(() => checkJwtExpiration(), 23 * 60 * 60 * 1000);
  }
}

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({type: REGISTER_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    clearJwt(data)
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({type: REGISTER_SUCCESS, payload: data.jwt});
  } catch (error) {
    dispatch(handleError(REGISTER_FAILURE,
      error.response?.data?.errorMessage || error.message));
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({type: LOGIN_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/signIn`, reqData.userData);
    clearJwt(data)
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({type: LOGIN_SUCCESS, payload: data.jwt});
    dispatch(getAllRestaurantAction(data.jwt));
  } catch (error) {
    dispatch(handleError(LOGIN_FAILURE,
      error.response?.data?.errorMessage || error.message));
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({type: GET_USER_REQUEST});
  try {
    const {data} = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({type: GET_USER_SUCCESS, payload: data});
  } catch (error) {
    dispatch(handleError(GET_USER_FAILURE,
      error.response?.data?.errorMessage || error.message));
  }
};

export const addToFavorite = (jwt, restaurantId) => async (dispatch) => {
  dispatch({type: ADD_TO_FAVORITE_REQUEST});
  try {
    const {data} = await api.put(`/api/restaurant/add-favourite?restaurantId=${restaurantId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    dispatch({type: ADD_TO_FAVORITE_SUCCESS, payload: data});
    console.log("added to favorite", data);
  } catch (error) {
    dispatch(handleError(ADD_TO_FAVORITE_FAILURE,
      error.response?.data?.errorMessage || error.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({type: LOGOUT});
  try {
    localStorage.clear();
    dispatch({type: LOGOUT});
  } catch (error) {
    console.error("Error during logout", error);
  }
};

export const initiateResetPasswordRequest = (reqData) => async (dispatch) => {
  dispatch({type: INITIATE_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await api.post(`/auth/initiate-password-request?email=${reqData.email}`,
      {});
    dispatch({type: INITIATE_RESET_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch(handleError(INITIATE_RESET_PASSWORD_FAILURE,
      error.response?.data?.errorMessage || error.message));
  }
};

export const ResetPasswordRequest = (resetRequest) => async (dispatch) => {
  dispatch({type: RESET_PASSWORD_REQUEST});
  try {
    const {data} = await api.post(`/auth/reset-password`, resetRequest.resetRequest);
    dispatch({type: RESET_PASSWORD_SUCCESS, payload: data});
    dispatch({type: RESET_PASSWORD_SUCCESS_MESSAGE, payload: "Password reset successful! Redirecting to login..."});
    setTimeout(() => {
      resetRequest.navigate("/account/login");
    }, 2000);
  } catch (error) {
    dispatch(handleError(RESET_PASSWORD_FAILURE,
      error.response?.data?.errorMessage || error.message));
    console.log("error", error);
  }
};