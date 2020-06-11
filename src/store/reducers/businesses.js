import { SET_BUSINESSES } from "../actions/businesses";

const initialState = {
  businesses: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESSES:
      return {
        ...state,
        businesses: action.businesses,
      };
    default:
      return state;
  }
};
