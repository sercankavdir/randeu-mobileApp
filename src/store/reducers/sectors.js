import { SET_SECTORS } from "../actions/sectors";

const initialState = {
  sectorList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTORS:
      return {
        ...state,
        sectorList: action.sectorList,
      };
    default:
      return state;
  }
};
