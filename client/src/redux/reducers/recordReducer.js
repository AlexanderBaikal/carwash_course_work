import {
  SET_DATE,
  SET_SELECTED_CAR_ID,
  SET_SELECTED_ORG_ID,
  SET_SELECTED_SERVICES,
} from "../actions/recordAction";

import {} from "../actions/authAction";

const defaultState = {
  selectedCarId: 0,
  selectedOrgId: 0,
  selectedDate: {},
  selectedServices: [],
};

export const recordReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SELECTED_CAR_ID:
      return {
        ...state,
        selectedCarId: action.payload,
      };

    case SET_SELECTED_ORG_ID:
      return {
        ...state,
        selectedOrgId: action.payload,
      };
    case SET_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case SET_SELECTED_SERVICES:
      return {
        ...state,
        selectedServices: action.payload,
      };
  }
  return state;
};
