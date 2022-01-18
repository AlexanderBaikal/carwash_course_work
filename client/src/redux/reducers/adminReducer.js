import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
} from "../actions/adminAction";

const defaultState = {
  users: [],
  loading: true,
};

export const adminReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
    case UPDATE_USER_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USERS_SUCCESS:
    case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_ALL_USERS_FAIL:
    case UPDATE_USER_ROLE_FAIL:
      return {
        ...state,
        loading: false,
      };
  }
  return state;
};
