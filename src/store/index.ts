import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageStore';
import surveyReducer from './surveyStore';

const rootReducer = combineReducers({
  page: pageReducer,
  survey: surveyReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
