import * as actionTypes from "./types";

const INITIAL_STATE = {
  isLoading: false,
  isSuccess: false,
};

const admissionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PERSONAL_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.PERSONL_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case actionTypes.PERSONAL_FAILED:
      return { INITIAL_STATE };
  }
};

export default admissionReducer;
