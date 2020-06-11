export const SET_BUSINESSES = "SET_BUSINESSES";

export const fetchBusinesses = (businessTypeName) => {
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
      dispatch({
        type: SET_BUSINESSES,
        businesses: resData.data,
      });
    } catch (err) {
      throw err;
    }
  };
};
