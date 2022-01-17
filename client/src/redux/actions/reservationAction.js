export const GET_USER_RESERVATIONS_REQUEST = "GET_USER_RESERVATIONS_REQUEST";
export const GET_USER_RESERVATIONS_SUCCESS = "GET_USER_RESERVATIONS_SUCCESS";
export const GET_USER_RESERVATIONS_FAIL = "GET_USER_RESERVATIONS_FAIL";
export const GET_USER_RESERVATIONS = "GET_USER_RESERVATIONS";

export const getUserReservationsRequest = () => {
  return {
    type: GET_USER_RESERVATIONS_REQUEST,
  };
};

export const getUserReservationsSuccess = (reservations) => {
  return {
    type: GET_USER_RESERVATIONS_SUCCESS,
    payload: reservations,
  };
};

export const getUserReservationsFail = () => {
  return {
    type: GET_USER_RESERVATIONS_FAIL,
  };
};

export const getUserReservations = (orgId) => {
  return {
    type: GET_USER_RESERVATIONS,
    payload: orgId,
  };
};

// -------------

export const GET_DAY_RESERVATIONS_REQUEST = "GET_DAY_RESERVATIONS_REQUEST";
export const GET_DAY_RESERVATIONS_SUCCESS = "GET_DAY_RESERVATIONS_SUCCESS";
export const GET_DAY_RESERVATIONS_FAIL = "GET_DAY_RESERVATIONS_FAIL";
export const GET_DAY_RESERVATIONS = "GET_DAY_RESERVATIONS";

export const getDayReservationsRequest = () => {
  return {
    type: GET_DAY_RESERVATIONS_REQUEST,
  };
};

export const getDayReservationsSuccess = (reservations) => {
  return {
    type: GET_DAY_RESERVATIONS_SUCCESS,
    payload: reservations,
  };
};

export const getDayReservationsFail = (error) => {
  return {
    type: GET_DAY_RESERVATIONS_FAIL,
    payload: error,
  };
};

export const getDayReservations = (data) => {
  return {
    type: GET_DAY_RESERVATIONS,
    payload: data,
  };
};

/// ---------

export const ADD_RESERVATION_REQUEST = "ADD_RESERVATION_REQUEST";
export const ADD_RESERVATION_SUCCESS = "ADD_RESERVATION_SUCCESS";
export const ADD_RESERVATION_FAIL = "ADD_RESERVATION_FAIL";
export const ADD_RESERVATION = "ADD_RESERVATION";

export const addReservationRequest = () => {
  return {
    type: ADD_RESERVATION_REQUEST,
  };
};

export const addReservationSuccess = (reservation) => {
  return {
    type: ADD_RESERVATION_SUCCESS,
    payload: reservation,
  };
};

export const addReservationFail = (error) => {
  return {
    type: ADD_RESERVATION_FAIL,
    payload: error,
  };
};

export const addReservation = (data) => {
  return {
    type: ADD_RESERVATION,
    payload: data,
  };
};

// -----

export const UPDATE_RESERVATION_REQUEST = "UPDATE_RESERVATION_REQUEST";
export const UPDATE_RESERVATION_SUCCESS = "UPDATE_RESERVATION_SUCCESS";
export const UPDATE_RESERVATION_FAIL = "UPDATE_RESERVATION_FAIL";
export const UPDATE_RESERVATION = "UPDATE_RESERVATION";

export const updateReservationRequest = () => {
  return {
    type: UPDATE_RESERVATION_REQUEST,
  };
};

export const updateReservationSuccess = (reservation) => {
  return {
    type: UPDATE_RESERVATION_SUCCESS,
    payload: reservation,
  };
};

export const updateReservationFail = (error) => {
  return {
    type: UPDATE_RESERVATION_FAIL,
    payload: error,
  };
};

export const updateReservation = (data) => {
  return {
    type: UPDATE_RESERVATION,
    payload: data,
  };
};

export const SET_ACTIVE_RESERVATION = "SET_ACTIVE_RESERVATION";

export const setActiveReservation = (reservation) => {
  return {
    type: SET_ACTIVE_RESERVATION,
    payload: reservation,
  };
};

export const SET_EDITABLE_RESERVATION_ID = "SET_EDITABLE_RESERVATION_ID";

export const setEditableReservationId = (reservation) => {
  return {
    type: SET_EDITABLE_RESERVATION_ID,
    payload: reservation,
  };
};

// ---

export const DELETE_RESERVATION_REQUEST = "DELETE_RESERVATION_REQUEST";
export const DELETE_RESERVATION_SUCCESS = "DELETE_RESERVATION_SUCCESS";
export const DELETE_RESERVATION_FAIL = "DELETE_RESERVATION_FAIL";
export const DELETE_RESERVATION = "DELETE_RESERVATION";

export const deleteReservationRequest = () => {
  return {
    type: DELETE_RESERVATION_REQUEST,
  };
};

export const deleteReservationSuccess = (reservation) => {
  return {
    type: DELETE_RESERVATION_SUCCESS,
    payload: reservation,
  };
};

export const deleteReservationFail = (error) => {
  return {
    type: DELETE_RESERVATION_FAIL,
    payload: error,
  };
};

export const deleteReservation = (data) => {
  return {
    type: DELETE_RESERVATION,
    payload: data,
  };
};

export const SET_RESERVATION_SUCCESS_STATUS = "SET_RESERVATION_SUCCESS_STATUS";

export const setReservationSuccessStatus = (status) => {
  return {
    type: SET_RESERVATION_SUCCESS_STATUS,
    payload: status,
  };
};

// ---

export const GET_USER_HISTORY_REQUEST = "GET_USER_HISTORY_REQUEST";
export const GET_USER_HISTORY_SUCCESS = "GET_USER_HISTORY_SUCCESS";
export const GET_USER_HISTORY_FAIL = "GET_USER_HISTORY_FAIL";
export const GET_USER_HISTORY = "GET_USER_HISTORY";

export const getUserHistoryRequest = () => {
  return {
    type: GET_USER_HISTORY_REQUEST,
  };
};

export const getUserHistorySuccess = (reservations) => {
  return {
    type: GET_USER_HISTORY_SUCCESS,
    payload: reservations,
  };
};

export const getUserHistoryFail = (error) => {
  return {
    type: GET_USER_HISTORY_FAIL,
    payload: error,
  };
};

export const getUserHistory = (userId) => {
  return {
    type: GET_USER_HISTORY,
    payload: userId,
  };
};
