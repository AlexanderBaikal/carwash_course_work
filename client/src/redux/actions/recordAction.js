export const SET_SELECTED_CAR_ID = 'SET_SELECTED_CAR_ID';
export const SET_SELECTED_ORG_ID = 'SET_SELECTED_ORG_ID';
export const SET_SELECTED_SERVICES = 'SET_SELECTED_SERVICES';
export const SET_DATE = 'SET_DATE';

export const setSelectedCarId = id => {
  return {
    type: SET_SELECTED_CAR_ID,
    payload: id,
  };
};

export const setSelectedOrgId = id => {
  return {
    type: SET_SELECTED_ORG_ID,
    payload: id,
  };
};

export const setSelectedServices = services => {
  return {
    type: SET_SELECTED_SERVICES,
    payload: services,
  };
};

export const setDate = date => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

// ----
