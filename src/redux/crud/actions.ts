// import {  admin_crud_request } from "../../service/crud.service"
// import * as actionTypes from "./types";
//
// export const crud = {
//   resetState:
//     (props = {}) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.RESET_STATE,
//       });
//     },
//   resetAction:
//     ({ actionType, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.RESET_ACTION,
//         keyState: actionType,
//         payload: null,
//       });
//     },
//   currentItem:
//     ({ data, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.CURRENT_ITEM,
//         payload: { ...data },
//       });
//     },
//   currentAction:
//     ({ actionType, data, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.CURRENT_ACTION,
//         keyState: actionType,
//         payload: { ...data },
//       });
//     },
//   leaveList:
//     ({ options = { page: 1, items: 10 }, token, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//         keyState: "list",
//         payload: null,
//       });
//
//       let data = await admin_crud_request.leaveList({
//         options,
//         token,
//         hotAxiosPrivate,
//       });
//
//       // if (data.success === true) {
//       if (data.length) {
//         const result = {
//           items: data || data.result,
//           pagination: {
//             current: parseInt(data?.pagination?.page, 10) || 1,
//             pageSize: options?.items,
//             total: parseInt(data?.pagination?.count, 10) || 1,
//           },
//         };
//         dispatch({
//           type: actionTypes.REQUEST_SUCCESS,
//           keyState: "list",
//           payload: result,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//           keyState: "list",
//           payload: null,
//         });
//       }
//     },
//   list:
//     ({ role, entity, options = { page: 1, items: 10 }, token, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//         keyState: "list",
//         payload: null,
//       });
//
//
//         let data = await admin_crud_request.list({
//        role, entity,
//         options,
//         token,
//         hotAxiosPrivate,
//       });
//
//       // if (data.success === true) {
//       if (data.success) {
//
//         const result = {
//           items: data.data ,
//           pagination: {
//             current: parseInt(data?.pagination?.page, 10) || 1,
//             pageSize: options?.items,
//             total: parseInt(data?.pagination?.count, 10) || 1,
//           },
//         };
//         dispatch({
//           type: actionTypes.REQUEST_SUCCESS,
//           keyState: "list",
//           payload: result,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//           keyState: "list",
//           payload: null,
//         });
//       }
//     },
//   create:
//     ({role,  entity, jsonData, withUpload = false, token, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//         keyState: "create",
//         payload: null,
//       });
//       let data = null;
//       if (withUpload) {
//         data = await admin_crud_request.createAndUpload({ entity, jsonData });
//       } else {
//         data = await admin_crud_request.post({role, entity, jsonData, token , hotAxiosPrivate});
//       }
//
//       if (data.success === true) {
//         dispatch({
//           type: actionTypes.REQUEST_SUCCESS,
//           keyState: "create",
//           payload: data.data,
//         });
//
//         dispatch({
//           type: actionTypes.CURRENT_ITEM,
//           payload: data.result,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//           keyState: "create",
//           payload: null,
//         });
//       }
//     },
//   read:
//     ({ entity, id, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//         keyState: "read",
//         payload: null,
//       });
//
//       let data = await admin_crud_request.read({ entity, id });
//
//       if (data.success === true) {
//         dispatch({
//           type: actionTypes.CURRENT_ITEM,
//           payload: data.result,
//         });
//         dispatch({
//           type: actionTypes.REQUEST_SUCCESS,
//           keyState: "read",
//           payload: data.result,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//           keyState: "read",
//           payload: null,
//         });
//       }
//     },
//   update:
//     ({ entity, id, jsonData, withUpload = false, token, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//         keyState: "update",
//         payload: null,
//       });
//
//       let data = null;
//
//       if (withUpload) {
//         data = await admin_crud_request.updateAndUpload({ entity, id, jsonData, token });
//       } else {
//         data = await admin_crud_request.update({ entity, id, jsonData, token });
//       }
//
//       if (data.success === true) {
//         dispatch({
//           type: actionTypes.REQUEST_SUCCESS,
//           keyState: "update",
//           payload: data.result,
//         });
//         dispatch({
//           type: actionTypes.CURRENT_ITEM,
//           payload: data.result,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//           keyState: "update",
//           payload: null,
//         });
//       }
//     },
//
//   delete:
//     ({ entity, entityId, role, hotAxiosPrivate }) =>
//     async (dispatch) => {
//
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//         keyState: "delete",
//         payload: null,
//       });
//       let data = await admin_crud_request.remove({ entity, entityId, role, hotAxiosPrivate });
//
//
//
//       if (data.success) {
//         dispatch({
//           type: actionTypes.DELETE_SUCCESS,
//           keyState: "delete",
//           payload: data.data,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//           keyState: "delete",
//           payload: null,
//         });
//       }
//     },
//
//   search:
//     ({ entity, options = {}, hotAxiosPrivate }) =>
//     async (dispatch) => {
//       dispatch({
//         type: actionTypes.REQUEST_LOADING,
//         keyState: "search",
//         payload: null,
//       });
//
//       let data = await admin_crud_request.search({ entity, options });
//
//       if (data.success === true) {
//         dispatch({
//           type: actionTypes.REQUEST_SUCCESS,
//           keyState: "search",
//           payload: data.result,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.REQUEST_FAILED,
//           keyState: "search",
//           payload: null,
//         });
//       }
//     },
// };
