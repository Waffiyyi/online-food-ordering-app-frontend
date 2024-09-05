import {api} from "../../Config/api.js";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENT_FAILURE,
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_EVENT_FAILURE,
  GET_RESTAURANT_EVENT_REQUEST,
  GET_RESTAURANT_EVENT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType.js";
import {data} from "autoprefixer";

export const getAllRestaurantAction = (token) => {
  return async (dispatch) => {
    dispatch({type: GET_ALL_RESTAURANT_REQUEST});
    try {
      const {data} = await api.get("/api/restaurant/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({type: GET_ALL_RESTAURANT_SUCCESS, payload: data});
      console.log("all restaurant", data)
    } catch (error) {
      console.log("catch error", error)
      dispatch({type: GET_ALL_RESTAURANT_FAILURE, payload: error});
    }
  }
}

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({type: GET_RESTAURANT_BY_ID_REQUEST});
    try {
      const response = await api.get(`api/restaurant/get?restaurantId=${reqData.restaurantId}`, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data})
    } catch (error) {
      console.log("error")
      dispatch({type: GET_RESTAURANT_BY_ID_FAILURE, payload: error})
    }
  }
}

export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({type: GET_RESTAURANT_BY_USER_ID_REQUEST});
    try {
      const {data} = await api.get(`api/admin/restaurant/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurant by user id", data)
      dispatch({type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data})
    } catch (error) {
      console.log("error", error)
      dispatch({type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message})
    }
  }
}


export const createRestaurant = (reqData) => {
  return async (dispatch) => {
    dispatch({type: CREATE_RESTAURANT_REQUEST});
    try {
      const {data} = await api.post(`api/admin/restaurant/create`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      console.log("create restaurant", data)
      dispatch({type: CREATE_RESTAURANT_SUCCESS, payload: data})
    } catch (error) {
      console.log("error")
      dispatch({type: CREATE_RESTAURANT_FAILURE, payload: error.message})
    }
  }
}


export const updateRestaurant = ({restaurantId, restaurantData, jwt}) => {
  return async (dispatch) => {
    dispatch({type: UPDATE_RESTAURANT_REQUEST});
    try {
      const res = await api.put(`api/admin/restaurant/update?restaurantId=${restaurantId}`, restaurantData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update restaurant", data)
      dispatch({type: UPDATE_RESTAURANT_SUCCESS, payload: res.data})
    } catch (error) {
      console.log("error")
      dispatch({type: UPDATE_RESTAURANT_FAILURE, payload: error.message})
    }
  }
}


export const deleteRestaurant = ({restaurantId, jwt}) => {
  return async (dispatch) => {
    dispatch({type: DELETE_RESTAURANT_REQUEST});
    try {
      const res = await api.delete(`api/admin/restaurant/delete?restaurantId${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete restaurant", res)
      dispatch({type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId})
    } catch (error) {
      console.log("error")
      dispatch({type: DELETE_RESTAURANT_FAILURE, payload: error.message})
    }
  }
}

export const updateRestaurantStatus = ({restaurantId, jwt}) => {
  return async (dispatch) => {
    dispatch({type: UPDATE_RESTAURANT_STATUS_REQUEST});
    try {
      const res = await api.put(`api/admin/restaurant/update-status?restaurantId=${restaurantId}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update restaurant status", res.data)
      dispatch({type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data})
    } catch (error) {
      console.log("error", error)
      dispatch({type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error.message})
    }
  }
}

export const createEvent = ({requestData}) => {
  return async (dispatch) => {
    dispatch({type: CREATE_EVENT_REQUEST});
    try {
      const res = await api.post(`api/admin/events/create-event?restaurantId=${requestData.restaurantId}`, requestData.data, {
        headers: {
          Authorization: `Bearer ${requestData.jwt}`,
        },
      });
      console.log("create event", requestData)
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });

      dispatch(getRestaurantEvents({ restaurantId: requestData.restaurantId, jwt: requestData.jwt }));
    } catch (error) {
      console.log("error", error)
      dispatch({type: CREATE_EVENT_FAILURE, payload: error.message})
    }
  }
}

export const getAllEvent = ({jwt}) => {
  return async (dispatch) => {
    dispatch({type: GET_ALL_EVENT_REQUEST});
    try {
      const res = await api.get(`api/events/get-all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all events", res.data)
      dispatch({type: GET_ALL_EVENT_SUCCESS, payload: res.data})
    } catch (error) {
      console.log("error", error)
      dispatch({type: GET_ALL_EVENT_FAILURE, payload: error.message})
    }
  }
}

export const deleteEvent = ({eventId, jwt}) => {
  return async (dispatch) => {
    dispatch({type: DELETE_EVENT_REQUEST});
    try {
      const res = await api.delete(`api/admin/events/delete-event?eventId=${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete events", res)
      dispatch({type: DELETE_EVENT_SUCCESS, payload: eventId})
    } catch (error) {
      console.log("error", error)
      dispatch({type: DELETE_EVENT_FAILURE, payload: error.message})
    }
  }
}

export const getRestaurantEvents = ({restaurantId, jwt}) => {
  return async (dispatch) => {
    dispatch({type: GET_RESTAURANT_EVENT_REQUEST});
    try {
      const res = await api.get(`api/admin/events/get-restaurant-events?restaurantId=${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurant events", res.data)
      dispatch({type: GET_RESTAURANT_EVENT_SUCCESS, payload: res.data})
    } catch (error) {
      console.log("error", error)
      dispatch({type: GET_RESTAURANT_EVENT_FAILURE, payload: error.message})
    }
  }
}

export const createCategory = ({reqData, jwt}) => {
  return async (dispatch) => {
    dispatch({type: CREATE_CATEGORY_REQUEST});
    try {
      const res = await api.post(`/api/admin/category/create`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category", res.data)
      dispatch({type: CREATE_CATEGORY_SUCCESS, payload: res.data})
    } catch (error) {
      console.log("error", error)
      dispatch({type: CREATE_CATEGORY_FAILURE, payload: error.message})
    }
  }
}

export const getRestaurantCategory = ({restaurantId, jwt}) => {
  return async (dispatch) => {
    dispatch({type: GET_RESTAURANT_CATEGORY_REQUEST});
    try {
      const res = await api.get(`/api/category/restaurant?restaurantId=${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurants category", res.data)
      dispatch({type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data})
    } catch (error) {
      console.log("error", error)
      dispatch({type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error.message})
    }
  }
}

