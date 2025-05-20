import { configureStore } from "@reduxjs/toolkit";
import roootReducer from "./rootReducer";

const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};    

const initalState = {
  auth: AUTH_INITIAL_STATE,
};
const store = configureStore({
  reducer: roootReducer,
  preloadedState: initalState,
  devTools: import.meta.env.MODE === "production",
});

export default store;
