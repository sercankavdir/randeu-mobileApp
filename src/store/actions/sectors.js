import * as actionTypes from "./actionTypes";

export const setSectorList = (sectorList) => {
  return {
    type: actionTypes.SET_SECTORS,
    sectorList: sectorList,
  };
};

export const fetchSectorListFailed = (err) => {
  return {
    type: actionTypes.FETCH_SECTORS_FAILED,
    sectorListError: err,
  };
};

export const initSectorList = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://randeu-backend.herokuapp.com/admin/sectors"
      );
      const resData = await response.json();
      const data = resData.data;
      dispatch(setSectorList(data));
    } catch (err) {
      dispatch(fetchSectorListFailed(err));
    }
  };
};
