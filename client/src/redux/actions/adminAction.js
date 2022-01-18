export const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAIL = "GET_ALL_USERS_FAIL";
export const GET_ALL_USERS = "GET_ALL_USERS";

export const getAllUsersRequest = () => {
  return {
    type: GET_ALL_USERS_REQUEST,
  };
};

export const getAllUsersSuccess = (orgs) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: orgs,
  };
};

export const getAllUsersFail = (error) => {
  return {
    type: GET_ALL_USERS_FAIL,
    payload: error,
  };
};

export const getAllUsers = () => {
  return {
    type: GET_ALL_USERS,
  };
};

export const UPDATE_USER_ROLE_REQUEST = "UPDATE_USER_ROLE_REQUEST";
export const UPDATE_USER_ROLE_SUCCESS = "UPDATE_USER_ROLE_SUCCESS";
export const UPDATE_USER_ROLE_FAIL = "UPDATE_USER_ROLE_FAIL";
export const UPDATE_USER_ROLE = "UPDATE_USER_ROLE";

export const updateUserRoleRequest = () => {
  return {
    type: UPDATE_USER_ROLE_REQUEST,
  };
};

export const updateUserRoleSuccess = (orgs) => {
  return {
    type: UPDATE_USER_ROLE_SUCCESS,
    payload: orgs,
  };
};

export const updateUserRoleFail = (error) => {
  return {
    type: UPDATE_USER_ROLE_FAIL,
    payload: error,
  };
};

export const updateUserRole = (payload) => {
  return {
    type: UPDATE_USER_ROLE,
    payload,
  };
};
