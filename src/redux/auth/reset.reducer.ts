import * as actionTypes from "./types";

const INITIAL_RESET = {
  isLoading: false,
  isSuccess: false,
};

const resetReducer = (state = INITIAL_RESET, action) => {
  switch (action.type) {
    case actionTypes.RESET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.RESET_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case actionTypes.RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case actionTypes.RESET_RESET:
      return { ...INITIAL_RESET };

    default:
      return state;
  }
};

export default resetReducer;
