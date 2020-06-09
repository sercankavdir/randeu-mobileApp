export const SET_SECTORS = "SET_SECTORS";

export const fetchSectors = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://randeu-backend.herokuapp.com/admin/sectors"
      );

      const resData = await response.json();
      dispatch({
        type: SET_SECTORS,
        sectorList: resData.data,
      });
    } catch (err) {
      throw err;
    }
  };
};
