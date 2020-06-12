import * as actionTypes from "./actionTypes";

export const setBusinessesList = (businessesList) => {
  return {
    type: actionTypes.SET_BUSINESSES,
    businessesList: businessesList,
  };
};

export const fetchBusinessesListFailed = (err) => {
  return {
    type: actionTypes.FETCH_BUSINESSES_FAILED,
    businessesListError: err,
  };
};

export const initBusinessesList = (businessTypeName) => {
  return async (dispatch) => {
    try {
      console.log(businessTypeName);

      const response = await fetch(
        "https://randeu-backend.herokuapp.com/business/businesslist-by-businesstype",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessTypeName: businessTypeName,
          }),
        }
      );

      const resData = await response.json();
      const data = resData.data;
      dispatch(setBusinessesList(data));
    } catch (err) {
      console.log(err.response);
      dispatch(fetchBusinessesListFailed(err));
    }
  };
};
