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
    setCriterion: (state, action) => {
      const criterion = action.payload;
      const exisiting = Object.keys(state.criteriaQuestion);
      const lastIx = exisiting.length - 1;
      const lastCriterion = exisiting[lastIx];
      const lastComparand = Object.keys(
        state.criteriaQuestion[lastCriterion],
      )[0];

      for (let i = 0; i < exisiting.length; i++) {
        const item = exisiting[i];
        state.criteriaQuestion[item][criterion] = {
          importancy: '',
          scale: 0,
          owner: 'User Defined',
        };
      }
      state.criteriaQuestion[lastComparand] = {
        [criterion]: {
          importancy: '',
          scale: 0,
          owner: 'User Defined',
        },
      };
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

export const setCriterion = (payload: string) => ({
  payload,
  type: 'survey/setCriterion',
});

export default surveyStore.reducer;
