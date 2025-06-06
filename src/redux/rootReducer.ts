import { combineReducers } from "redux";

import { reducer as authReducer } from "./auth";

const roootReducer = combineReducers({
  auth: authReducer,
  // studeAdmission: admissionReducer,
});

export default roootReducer;
