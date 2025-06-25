import { criteriaSurveyTree } from '@/data';
import { createSlice } from '@reduxjs/toolkit';

const surveyStore = createSlice({
  name: 'survey',
  initialState: {
    participant: {
      name: '',
      work_email: '',
      alternative_email: '',
      occupation: '',
      organisation: '',
      phone: '',
    },
    criteriaQuestion: JSON.parse(JSON.stringify(criteriaSurveyTree)),
  },
  reducers: {
    setParticipantValue: (state, action) => {
      const { keyName, value } = action.payload;
      state.participant[keyName] = value;
    },
    setCriteriaValue: (state, action) => {
      const { subject, value, comparand, type } = action.payload;
      state.criteriaQuestion[subject][comparand][type] = value;
    },
  },
});

export const setParticipantValue = (payload: {
  keyName: string;
  value: string | number;
}) => ({
  payload,
  type: 'survey/setParticipantValue',
});

export const setCriteriaValue = (payload: {
  subject: string;
  comparand: string;
  type: string;
  value: string | number;
}) => ({
  payload,
  type: 'survey/setCriteriaValue',
});

export default surveyStore.reducer;
