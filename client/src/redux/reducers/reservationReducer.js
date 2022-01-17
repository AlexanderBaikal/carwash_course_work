import {
  ADD_RESERVATION_FAIL,
  ADD_RESERVATION_REQUEST,
  ADD_RESERVATION_SUCCESS,
  DELETE_RESERVATION_FAIL,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  GET_DAY_RESERVATIONS_FAIL,
  GET_DAY_RESERVATIONS_REQUEST,
  GET_DAY_RESERVATIONS_SUCCESS,
  GET_USER_RESERVATIONS_FAIL,
  GET_USER_RESERVATIONS_REQUEST,
  GET_USER_RESERVATIONS_SUCCESS,
  SET_ACTIVE_RESERVATION,
  SET_EDITABLE_RESERVATION_ID,
  SET_RESERVATION_SUCCESS_STATUS,
  UPDATE_RESERVATION_FAIL,
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_SUCCESS,
} from "../actions/reservationAction";

import {} from "../actions/authAction";

const defaultState = {
  reservations: [],
  loading: false,
  error: false,
  dayReservations: [],
  activeReservation: null,
  editableReservationId: -1,
  success: false,
  history: [],
};

export const reservationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_RESERVATIONS_REQUEST:
    case ADD_RESERVATION_REQUEST:
    case UPDATE_RESERVATION_REQUEST:
    case DELETE_RESERVATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };

    case GET_USER_RESERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.payload,
      };

    case ADD_RESERVATION_SUCCESS:
    case UPDATE_RESERVATION_SUCCESS:
    case DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        reservations: action.payload,
        success: true,
      };

    case GET_USER_RESERVATIONS_FAIL:
    case ADD_RESERVATION_FAIL:
    case UPDATE_RESERVATION_FAIL:
    case DELETE_RESERVATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case GET_DAY_RESERVATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GET_DAY_RESERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        dayReservations: action.payload,
      };

    case GET_DAY_RESERVATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_ACTIVE_RESERVATION:
      return {
        ...state,
        activeReservation: action.payload,
      };
    case SET_EDITABLE_RESERVATION_ID:
      return {
        ...state,
        editableReservationId: action.payload,
      };
    case SET_RESERVATION_SUCCESS_STATUS:
      return {
        ...state,
        success: action.payload,
      };
  }
  return state;
};
