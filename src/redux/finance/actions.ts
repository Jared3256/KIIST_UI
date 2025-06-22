import * as actionTypes from "./types.ts"

import {admin_crud_request} from "src/service/crud.service.ts";

export const GetFinance = ({role, id, hotAxiosPrivate, entity}) => async (dispatch) => {
    dispatch({
        type: actionTypes.FINANCE_REQUEST_LOADING,
    });

    const data = await admin_crud_request.finance_get({
        hotAxiosPrivate: hotAxiosPrivate,
        entity: entity,
        id: id,
        role: role,
    })

    console.log(data.data)


    if (data.success) {
        const userData = data.data

        console.log(userData)

        dispatch({
            type: actionTypes.FINANCE_REQUEST_SUCCESS,
            payload: {userData},
        })
    } else {
        dispatch({
            type: actionTypes.FINANCE_REQUEST_FAILED,
            payload: {
                data,
            },
        });
    }
}
