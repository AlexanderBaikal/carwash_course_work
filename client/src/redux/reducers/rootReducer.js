import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { transportReducer } from "./transportReducer";
import { reservationsReducer } from "./reservationReducer";
import { organizationReducer } from "./organizationReducer";
import { recordReducer } from "./recordReducer";
import { modalReducer } from "./modalReducer";
import { adminReducer } from "./adminReducer";

const defaultState = {};

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
  }
  return state;
};

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  transport: transportReducer,
  reservations: reservationsReducer,
  organization: organizationReducer,
  record: recordReducer,
  modal: modalReducer,
  admin: adminReducer,
});
