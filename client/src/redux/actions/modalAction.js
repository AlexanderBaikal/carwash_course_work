export const SHOW_MODAL = "SHOW_MODAL";
export const TYPE_SUCCESS = "TYPE_SUCCESS";
export const TYPE_ERROR = "TYPE_ERROR";

export const showModal = (data) => {
  return {
    type: SHOW_MODAL,
    payload: data,
  };
};

export const HIDE_MODAL = "HIDE_MODAL";

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};
