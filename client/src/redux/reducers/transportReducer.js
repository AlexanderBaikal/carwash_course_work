import { SET_ACTIVE_CAR_ID } from "../actions/transportAction";
import {} from "../actions/authAction";

const defaultState = {
  activeCarId: null,
};

export const transportReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CAR_ID:
      return {
        ...state,
        activeCarId: action.payload,
      };
  }
  return state;
};
