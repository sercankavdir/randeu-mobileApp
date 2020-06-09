// import * as actionTypes from "./actionTypes";
// import axios from "../../axios";

// export const setBusinessTypesList = (businessTypesList) => {
//   return {
//     type: actionTypes.SET_BUSINESS_TYPES_LIST,
//     businessTypesList: businessTypesList,
//   };
// };

// export const fetchServicesListFailed = () => {
//   return {
//     type: actionTypes.FETCH_SERVICES_LIST_FAILED,
//   };
// };

// export const setServicesList = (servicesList) => {
//   return {
//     type: actionTypes.SET_SERVICES_LIST,
//     servicesList: servicesList,
//   };
// };

// export const initServicesList = () => {
//   return (dispatch) => {
//     axios
//       .get("/admin/services")
//       .then((response) => {
//         dispatch(setServicesList(response.data.data.servicesList));
//       })
//       .catch((err) => {
//         dispatch(fetchServicesListFailed());
//       });
//   };
// };

// export const fetchBusinessTypesListFailed = () => {
//   return {
//     type: actionTypes.FETCH_BUSINESS_TYPES_LIST_FAILED,
//   };
// };

// export const initBusinessTypesList = () => {
//   return (dispatch) => {
//     axios
//       .get("/admin/businesstypes")
//       .then((response) => {
//         dispatch(setBusinessTypesList(response.data.data.businessTypesList));
//       })
//       .catch((err) => {
//         dispatch(fetchBusinessTypesListFailed());
//       });
//   };
// };

// export const initBusinessList = () => {
//   return (dispatch) => {
//     axios
//       .get("/business/businessList")
//       .then((response) => {
//         dispatch(setBusinessList(response.data.data.businessList));
//       })
//       .catch((err) => {
//         dispatch(fetchBusinessListFailed());
//       });
//   };
// };

// export const setBusinessList = (businessList) => {
//   return {
//     type: actionTypes.SET_BUSINESS_LIST,
//     businessList: businessList,
//   };
// };

// export const fetchBusinessListFailed = () => {
//   return {
//     type: actionTypes.FETCH_BUSINESS_LIST_FAILED,
//   };
// };
