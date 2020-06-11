import * as actionTypes from "../actions/actionTypes";

const initialState = {
  sectorList: null,
  sectorListError: null,
};

const setSectorList = (state, action) => {
  return {
    ...state,
    sectorList: action.sectorList,
    sectorListError: null,
  };
};

const fetchSectorListError = (action, state) => {
  return {
    ...state,
    sectorListError: action.sectorListError,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SECTORS:
      return setSectorList(state, action);
    case actionTypes.FETCH_SECTORS_FAILED:
      return fetchSectorListError(action.state);
    default:
      return state;
  }
};
