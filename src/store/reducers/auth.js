import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
  userProfile: null,
  userProfileError: null,
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};
const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};
const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    error: null,
    loading: false,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
  };
};

const authErrorClear = (action, state) => {
  return {
    ...state,
    error: null,
    token: null,
    userProfile: null,
    userProfileError: null,
  };
};

const setUserProfileSuccess = (state, action) => {
  return {
    ...state,
    userProfile: action.userProfile,
    userProfileError: null,
  };
};

const fetchUserProfileFailed = (state, action) => {
  return {
    ...state,
    userProfile: null,
    userProfileError: action.userProfileError,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_ERROR_CLEAR:
      return authErrorClear(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_USER_PROFILE_SUCCESS:
      return setUserProfileSuccess(state, action);
    case actionTypes.FETCH_USER_PROFILE_FAILED:
      return fetchUserProfileFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
