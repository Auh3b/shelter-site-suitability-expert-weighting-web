import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consentFormOpen: true,
  consentGiven: false,
  errors: undefined,
};

const pageStore = createSlice({
  name: "page",
  initialState,
  reducers: {
    setConsentFormOpen: (state, action) => {
      state.consentFormOpen = action.payload;
    },
    setConsentGiven: (state, action) => {
      state.consentGiven = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const setConsentFormOpen = (payload: boolean) => ({
  payload,
  type: "page/setConsentFormOpen",
});
export const setConsentGiven = (payload: boolean) => ({
  payload,
  type: "page/setConsentGiven",
});

export const setErrors = (payload: {}) => ({
  payload,
  type: "page/setErrors",
});

export default pageStore.reducer;
