import { HIDE_MODAL, SHOW_MODAL } from "../actions/modalAction";

import {} from "../actions/authAction";

const defaultState = {
  message: null,
  type: null,
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        source: action.payload.source,
      };
    case HIDE_MODAL:
      return {
        ...state,
        message: null,
        type: null,
      };
  }
  return state;
};
