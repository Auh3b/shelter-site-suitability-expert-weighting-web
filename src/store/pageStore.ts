import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consentFormOpen: true,
  consentGiven: false,
  formSubmitted: false,
  submittedTries: 0,
  presetId: undefined,
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
    setFormSubmitted: (state) => {
      state.formSubmitted = true;
    },
    setRetry: (state) => {
      state.submittedTries += 1;
    },
    setPresetId: (state, action) => {
      state.presetId = action.payload;
    },
    resetErrors: (state) => {
      state.errors = undefined;
    },
    resetPageState: () => initialState,
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

export const resetErrors = () => ({ type: "page/resetErrors" });
export const setFormSubmitted = () => ({ type: "page/setFormSubmitted" });
export const setRetry = () => ({ type: "page/setRetry" });
export const resetPageState = () => ({ type: "page/resetPageState" });

export const setPresetId = (payload: string) => ({
  payload,
  type: "page/setPresetId",
});

export default pageStore.reducer;
