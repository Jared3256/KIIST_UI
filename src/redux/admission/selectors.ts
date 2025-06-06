import { createSelector } from 'reselect';

const admissionSelect = (state) => state.admission;

export const selectAdmission = (state) => state.admission;
export const selectReset = (state) => state.password;

export const  = createSelector(
  [selectAdmission],
  (auth) => auth.isLoggedIn
);