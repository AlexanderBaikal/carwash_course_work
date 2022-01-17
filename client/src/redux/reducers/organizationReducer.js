import {
  GET_COMPANY_ORGS_REQUEST,
  GET_COMPANY_ORGS_SUCCESS,
  GET_ORG_INFO_FAIL,
  GET_ORG_INFO_REQUEST,
  GET_ORG_INFO_SUCCESS,
  GET_PRICE_LIST_FAIL,
  GET_PRICE_LIST_REQUEST,
  GET_PRICE_LIST_SUCCESS,
} from "../actions/organizationAction";
import {} from "./../actions/authAction";
import { GET_COMPANY_ORGS_FAIL } from "../actions/organizationAction";

const defaultState = {
  info: {},
  loading: false,
  error: false,
  priceList: [],
  companyOrgs: [],
};

export const organizationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ORG_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GET_ORG_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        info: action.payload,
      };

    case GET_ORG_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: {},
      };

    case GET_PRICE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GET_PRICE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        priceList: action.payload,
      };

    case GET_PRICE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        priceList: [],
      };

    case GET_COMPANY_ORGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GET_COMPANY_ORGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        companyOrgs: action.payload,
      };

    case GET_COMPANY_ORGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        companyOrgs: [],
      };
  }
  return state;
};
