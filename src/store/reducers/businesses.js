import * as actionTypes from "../actions/actionTypes";

const initialState = {
  businessesList: [],
  businessesListError: null,
};

const setBusinessesList = (state, action) => {
  return {
    ...state,
    businessesList: action.businessesList,
    businessesListError: null,
  };
};

const fetchBusinessesListError = (action, state) => {
  return {
    ...state,
    businessesListError: action.businessesListError,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BUSINESSES:
      return setBusinessesList(state, action);
    case actionTypes.FETCH_BUSINESSES_FAILED:
      return fetchBusinessesListError(action, state);
    default:
      return state;
  }
};
