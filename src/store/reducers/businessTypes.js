import * as actionTypes from "../actions/actionTypes";

const initialState = {
  businessTypeList: [],
  businessTypeListError: null,
};

const setBusinessTypeList = (state, action) => {
  return {
    ...state,
    businessTypeList: action.businessTypeList,
    businessTypeListError: null,
  };
};

const fetchBusinessTypeListError = (action, state) => {
  return {
    ...state,
    businessTypeListError: action.businessTypeListError,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BUSINESSTYPES:
      return setBusinessTypeList(state, action);

    case actionTypes.FETCH_BUSINESSTYPES_FAILED:
      return fetchBusinessTypeListError(action, state);
    default:
      return state;
  }
};
