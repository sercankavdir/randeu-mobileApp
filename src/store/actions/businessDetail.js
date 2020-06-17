import * as actionTypes from "./actionTypes";

export const setBusinessDetail = (businessDetail) => {
  return {
    type: actionTypes.SET_BUSINESS_DETAIL,
    businessDetail: businessDetail,
  };
};

export const setBusinessProvidingServices = (businessProvidingServices) => {
  return {
    type: actionTypes.SET_BUSINESS_PROVIDING_SERVICES,
    businessProvidingServices: businessProvidingServices,
  };
};

export const fetchBusinessDetailFailed = (err) => {
  return {
    type: actionTypes.FETCH_BUSINESS_DETAIL_FAILED,
    businessDetailError: err,
  };
};

export const fetchBusinessProvidingServicesFailed = (err) => {
  return {
    type: actionTypes.FETCH_BUSINESS_PROVIDING_SERVICES_FAILED,
    businessProvidingServicesError: err,
  };
};

export const initBusinessDetail = (businessId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://randeu-backend.herokuapp.com/business/profile/${businessId}`
      );
      const resData = await response.json();
      const data = resData.data;
      dispatch(setBusinessDetail(data));
    } catch (err) {
      throw err.response.data.message;
    }
  };
};

export const initBusinessProvidingServices = (businessId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://randeu-backend.herokuapp.com/business/providingServiceList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessId: businessId,
          }),
        }
      );

      const resData = await response.json();
      const data = resData.data[0].populatedProvidingServices;
      dispatch(setBusinessProvidingServices(data));
    } catch (err) {
      console.log(err);
      dispatch(fetchBusinessDetailFailed(err));
    }
  };
};
