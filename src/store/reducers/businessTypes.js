import { SET_BUSINESSTYPES } from "../actions/businessTypes";

const initialState = {
  businessTypeList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESSTYPES:
      return {
        ...state,
        businessTypeList: action.businessTypeList,
      };
    default:
      return state;
  }
};
