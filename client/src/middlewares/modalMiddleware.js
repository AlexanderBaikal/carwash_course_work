import {
  ADD_TRANSPORT_FAIL,
  ADD_TRANSPORT_SUCCESS,
  DELETE_TRANSPORT_FAIL,
  DELETE_TRANSPORT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_TRANSPORT_FAIL,
  UPDATE_TRANSPORT_SUCCESS,
} from "../redux/actions/authAction";
import {
  showModal,
  TYPE_ERROR,
  TYPE_SUCCESS,
} from "../redux/actions/modalAction";
import {
  ADD_RESERVATION_FAIL,
  ADD_RESERVATION_SUCCESS,
  DELETE_RESERVATION_FAIL,
  DELETE_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_FAIL,
  UPDATE_RESERVATION_SUCCESS,
} from "../redux/actions/reservationAction";

export default (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case DELETE_RESERVATION_SUCCESS:
    case ADD_RESERVATION_SUCCESS:
    case UPDATE_RESERVATION_SUCCESS:
    case ADD_TRANSPORT_SUCCESS:
    case DELETE_TRANSPORT_SUCCESS:
    case UPDATE_TRANSPORT_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      store.dispatch(
        showModal({
          message: "Операция успешно завершена",
          type: TYPE_SUCCESS,
          source: action.type,
        })
      );
      break;

    case DELETE_RESERVATION_FAIL:
    case DELETE_TRANSPORT_FAIL:
    case UPDATE_RESERVATION_FAIL:
    case ADD_RESERVATION_FAIL:
    case ADD_TRANSPORT_FAIL:
    case UPDATE_TRANSPORT_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      store.dispatch(showModal({ message: action.payload, type: TYPE_ERROR }));
      break;

    default:
      break;
  }
};
