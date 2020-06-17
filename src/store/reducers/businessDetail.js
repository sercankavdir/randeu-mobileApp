import * as actionTypes from "../actions/actionTypes";

const initialState = {
  businessDetail: [],
  businessProvidingServices: [],
  businessDetailError: "",
  businessProvidingServicesError: "",
};

const setBusinessDetail = (state, action) => {
  return {
    ...state,
    businessDetail: action.businessDetail,
  };
};

const setBusinessProvidingServices = (state, action) => {
  return {
    ...state,
    businessProvidingServices: action.businessProvidingServices,
  };
};

const fetchBusinessDetailError = (state, action) => {
  return {
    ...state,
    businessDetailError: action.businessDetailError,
  };
};

const fetchBusinessProvidingServicesError = (state, action) => {
  return {
    ...state,
    businessProvidingServicesError: action.businessProvidingServicesError,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BUSINESS_DETAIL:
      return setBusinessDetail(state, action);
    case actionTypes.SET_BUSINESS_PROVIDING_SERVICES:
      return setBusinessProvidingServices(state, action);
    case actionTypes.FETCH_BUSINESS_PROVIDING_SERVICES_FAILED:
      return fetchBusinessProvidingServicesError(state, action);
    case actionTypes.FETCH_BUSINESS_DETAIL_FAILED:
      return fetchBusinessDetailError(state, action);
    default:
      return state;
  }
};
