import {
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAIL,
  LOG_OUT,
  ADD_TRANSPORT_REQUEST,
  ADD_TRANSPORT_SUCCESS,
  ADD_TRANSPORT_FAIL,
  UPDATE_TRANSPORT_REQUEST,
  UPDATE_TRANSPORT_SUCCESS,
  UPDATE_TRANSPORT_FAIL,
  DELETE_TRANSPORT_REQUEST,
  DELETE_TRANSPORT_SUCCESS,
  DELETE_TRANSPORT_FAIL,
  SET_USER_PHONE,
} from "../actions/authAction";

const defaultState = {
  user: {},
  loading: false,
  checkAuthLoading: true,
  error: false,
  userPhone: null,
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_PHONE:
      return {
        ...state,
        userPhone: action.payload,
      };
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case CHECK_AUTH_REQUEST:
    case ADD_TRANSPORT_REQUEST:
    case UPDATE_TRANSPORT_REQUEST:
    case DELETE_TRANSPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case ADD_TRANSPORT_SUCCESS:
    case UPDATE_TRANSPORT_SUCCESS:
    case DELETE_TRANSPORT_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      };

    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        checkAuthLoading: false,
      };

    case ADD_TRANSPORT_FAIL:
    case UPDATE_TRANSPORT_FAIL:
    case DELETE_TRANSPORT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        user: {},
        loading: false,
        error: action.payload,
      };
    case CHECK_AUTH_FAIL:
      return {
        ...state,
        checkAuthLoading: false,
      };

    case LOG_OUT:
      return {
        ...state,
        user: {},
        loading: false,
        error: false,
      };
  }
  return state;
};
