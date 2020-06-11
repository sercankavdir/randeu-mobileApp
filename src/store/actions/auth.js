import * as actionTypes from "./actionTypes";
import axios from "../../api/randeu";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const fetchUserProfileFailed = (error) => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_FAILED,
    userProfileError: error,
  };
};

export const setUserProfileSuccess = (userProfile) => {
  return {
    type: actionTypes.SET_USER_PROFILE_SUCCESS,
    userProfile: userProfile,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userProfile");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const rawObj = localStorage.getItem("userProfile");
    const userProfile = JSON.parse(rawObj);
    if (!token) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token));
      dispatch(setUserProfileSuccess(userProfile));
    }
  };
};

export const initUserProfile = (userToken) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "/user/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => {
        console.log("user profile:", response.data.data);
        const convertedData = JSON.stringify(response.data.data);
        localStorage.setItem("userProfile", convertedData);
        dispatch(setUserProfileSuccess(response.data.data));
      })
      .catch((err) => {
        dispatch(fetchUserProfileFailed(err));
      });
  };
};

export const authErrorClear = () => {
  return {
    type: actionTypes.AUTH_ERROR_CLEAR,
    error: null,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios({
      method: "POST",
      url: "/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.data.token);
        dispatch(authSuccess(response.data.data.token));
        dispatch(initUserProfile(response.data.data.token));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          dispatch(authFail(err.response.data.message));
          dispatch(fetchUserProfileFailed(err.response.data.message));
        } else {
          dispatch(
            authFail("Server ile bağlantı kurulamadı. Lütfen tekrar deneyin.")
          );
          dispatch(
            fetchUserProfileFailed(
              "Server ile bağlantı kurulamadı. Lütfen tekrar deneyin."
            )
          );
        }
      });
  };
};
