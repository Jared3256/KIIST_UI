import { combineReducers } from "redux";

import { reducer as authReducer } from "./auth";

const roootReducer = combineReducers({
  auth: authReducer,
});

export default roootReducer;
