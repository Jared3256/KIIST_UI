import {combineReducers} from "redux";

import {reducer as authReducer} from "./auth";
import financeReducer from "src/redux/finance/reducer.ts";

const roootReducer = combineReducers({
    auth: authReducer,
    finance: financeReducer,
});

export default roootReducer;
