import * as actionTypes from "./actionTypes";

export const setBusinessTypeList = (businessTypeList) => {
  return {
    type: actionTypes.SET_BUSINESSTYPES,
    businessTypeList: businessTypeList,
  };
};

export const fetchBusinessTypeListFailed = (err) => {
  return {
    type: actionTypes.FETCH_BUSINESSTYPES_FAILED,
    businessTypeListError: err,
  };
};

export const initBusinessTypeList = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://randeu-backend.herokuapp.com/admin/businesstypes/${id}`
      );

      const resData = await response.json();
      const data = resData.data.businessTypeList;
      dispatch(setBusinessTypeList(data));
    } catch (err) {
      dispatch(fetchBusinessTypeListFailed(err));
    }
  };
};
