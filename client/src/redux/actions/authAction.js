export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const REGISTER = "REGISTER";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN = "LOGIN";

export const CHECK_AUTH_REQUEST = "CHECK_AUTH_REQUEST";
export const CHECK_AUTH_SUCCESS = "CHECK_AUTH_SUCCESS";
export const CHECK_AUTH_FAIL = "CHECK_AUTH_FAIL";
export const CHECK_AUTH = "CHECK_AUTH";

export const LOG_OUT = "LOG_OUT";
export const SET_USER_PHONE = "SET_USER_PHONE";

export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registerFail = (error) => {
  return {
    type: REGISTER_FAIL,
    payload: error,
  };
};

export const register = (phone) => {
  return {
    type: REGISTER,
    payload: phone,
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const checkAuthRequest = () => {
  return {
    type: CHECK_AUTH_REQUEST,
  };
};

export const checkAuthSuccess = (user) => {
  return {
    type: CHECK_AUTH_SUCCESS,
    payload: user,
  };
};

export const checkAuthFail = (error) => {
  return {
    type: CHECK_AUTH_FAIL,
    payload: error,
  };
};

export const checkAuth = () => {
  return {
    type: CHECK_AUTH,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const setUserPhone = (phone) => {
  return {
    type: SET_USER_PHONE,
    payload: phone,
  };
};

export const ADD_TRANSPORT_REQUEST = "ADD_TRANSPORT_REQUEST";
export const ADD_TRANSPORT_SUCCESS = "ADD_TRANSPORT_SUCCESS";
export const ADD_TRANSPORT_FAIL = "ADD_TRANSPORT_FAIL";
export const ADD_TRANSPORT = "ADD_TRANSPORT";

export const addTransportRequest = () => {
  return {
    type: ADD_TRANSPORT_REQUEST,
  };
};

export const addTransportSuccess = (user) => {
  return {
    type: ADD_TRANSPORT_SUCCESS,
    payload: user,
  };
};

export const addTransportFail = (error) => {
  return {
    type: ADD_TRANSPORT_FAIL,
    payload: error,
  };
};

export const addTransport = (data) => {
  return {
    type: ADD_TRANSPORT,
    payload: data,
  };
};

export const UPDATE_TRANSPORT_REQUEST = "UPDATE_TRANSPORT_REQUEST";
export const UPDATE_TRANSPORT_SUCCESS = "UPDATE_TRANSPORT_SUCCESS";
export const UPDATE_TRANSPORT_FAIL = "UPDATE_TRANSPORT_FAIL";
export const UPDATE_TRANSPORT = "UPDATE_TRANSPORT";

export const updateTransportRequest = () => {
  return {
    type: UPDATE_TRANSPORT_REQUEST,
  };
};

export const updateTransportSuccess = (user) => {
  return {
    type: UPDATE_TRANSPORT_SUCCESS,
    payload: user,
  };
};

export const updateTransportFail = (error) => {
  return {
    type: UPDATE_TRANSPORT_FAIL,
    payload: error,
  };
};

export const updateTransport = (data) => {
  return {
    type: UPDATE_TRANSPORT,
    payload: data,
  };
};

export const DELETE_TRANSPORT_REQUEST = "DELETE_TRANSPORT_REQUEST";
export const DELETE_TRANSPORT_SUCCESS = "DELETE_TRANSPORT_SUCCESS";
export const DELETE_TRANSPORT_FAIL = "DELETE_TRANSPORT_FAIL";
export const DELETE_TRANSPORT = "DELETE_TRANSPORT";

export const deleteTransportRequest = () => {
  return {
    type: DELETE_TRANSPORT_REQUEST,
  };
};

export const deleteTransportSuccess = (user) => {
  return {
    type: DELETE_TRANSPORT_SUCCESS,
    payload: user,
  };
};

export const deleteTransportFail = (error) => {
  return {
    type: DELETE_TRANSPORT_FAIL,
    payload: error,
  };
};

export const deleteTransport = (carId) => {
  return {
    type: DELETE_TRANSPORT,
    payload: carId,
  };
};
