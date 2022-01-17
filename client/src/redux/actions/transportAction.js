export const SET_ACTIVE_CAR_ID = "SET_ACTIVE_CAR_ID";

export const setActiveCarId = (id) => {
  return {
    type: SET_ACTIVE_CAR_ID,
    payload: id,
  };
};
