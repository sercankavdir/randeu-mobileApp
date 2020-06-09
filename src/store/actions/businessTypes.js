export const SET_BUSINESSTYPES = "SET_BUSINESSES";

export const fetchBusinessTypes = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://randeu-backend.herokuapp.com/admin/businesstypes/${id}`
      );

      const resData = await response.json();

      dispatch({
        type: SET_BUSINESSTYPES,
        businessTypeList: resData.data.businessTypeList,
      });
    } catch (err) {
      throw err;
    }
  };
};
