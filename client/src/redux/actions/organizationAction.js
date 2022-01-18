export const GET_ORG_INFO_REQUEST = "GET_ORG_INFO_REQUEST";
export const GET_ORG_INFO_SUCCESS = "GET_ORG_INFO_SUCCESS";
export const GET_ORG_INFO_FAIL = "GET_ORG_INFO_FAIL";
export const GET_ORG_INFO = "GET_ORG_INFO";

export const getOrgInfoRequest = () => {
  return {
    type: GET_ORG_INFO_REQUEST,
  };
};

export const getOrgInfoSuccess = (discounts) => {
  return {
    type: GET_ORG_INFO_SUCCESS,
    payload: discounts,
  };
};

export const getOrgInfoFail = (error) => {
  return {
    type: GET_ORG_INFO_FAIL,
    payload: error,
  };
};

export const getOrgInfo = (orgId) => {
  return {
    type: GET_ORG_INFO,
    payload: orgId,
  };
};

export const GET_PRICE_LIST_REQUEST = "GET_PRICE_LIST_REQUEST";
export const GET_PRICE_LIST_SUCCESS = "GET_PRICE_LIST_SUCCESS";
export const GET_PRICE_LIST_FAIL = "GET_PRICE_LIST_FAIL";
export const GET_PRICE_LIST = "GET_PRICE_LIST";

export const getPriceListRequest = () => {
  return {
    type: GET_PRICE_LIST_REQUEST,
  };
};

export const getPriceListSuccess = (priceList) => {
  return {
    type: GET_PRICE_LIST_SUCCESS,
    payload: priceList,
  };
};

export const getPriceListFail = (error) => {
  return {
    type: GET_PRICE_LIST_FAIL,
    payload: error,
  };
};

export const getPriceList = (orgId, transportTypeName) => {
  return {
    type: GET_PRICE_LIST,
    payload: {
      orgId,
      transportTypeName,
    },
  };
};

export const GET_COMPANY_ORGS_REQUEST = "GET_COMPANY_ORGS_REQUEST";
export const GET_COMPANY_ORGS_SUCCESS = "GET_COMPANY_ORGS_SUCCESS";
export const GET_COMPANY_ORGS_FAIL = "GET_COMPANY_ORGS_FAIL";
export const GET_COMPANY_ORGS = "GET_COMPANY_ORGS";

export const getCompanyOrgsRequest = () => {
  return {
    type: GET_COMPANY_ORGS_REQUEST,
  };
};

export const getCompanyOrgsSuccess = (orgs) => {
  return {
    type: GET_COMPANY_ORGS_SUCCESS,
    payload: orgs,
  };
};

export const getCompanyOrgsFail = (error) => {
  return {
    type: GET_COMPANY_ORGS_FAIL,
    payload: error,
  };
};

export const getCompanyOrgs = () => {
  return {
    type: GET_COMPANY_ORGS,
  };
};
