import * as actionTypes from "./types";

const INITIAL_STATE = {
    currentFinance: {},
};

const financeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FINANCE_REQUEST_LOADING:
            return {
                ...state,
            };
        case actionTypes.FINANCE_REQUEST_FAILED:
            return {
                ...INITIAL_STATE,
                errorMessage: action.payload,
            };

        case actionTypes.FINANCE_REQUEST_SUCCESS:
            console.log("Setting data")
            console.log(action.payload)


            return {
                currentFinance: {...action.payload.userData},
            };
        default:
            return state;
    }
};

export default financeReducer;
