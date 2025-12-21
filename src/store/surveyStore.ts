import type {
  ConsistencyRatio,
  CriteriaTree,
  Importancy,
  Scale,
  SurveyState,
} from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  participant: {
    name: '',
    work_email: '',
    alternative_email: '',
    occupation: '',
    organisation: '',
    phone: '',
  },
  criteriaRanking: undefined,
  criteriaLookup: undefined,
  consistencyRatio: undefined,
} as SurveyState;

const surveyStore = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setParticipantValue: (state, action) => {
      const { keyName, value } = action.payload;
      if (
        [
          'name',
          'work_email',
          'alternative_email',
          'occupation',
          'organisation',
          'phone',
        ].includes(keyName)
      ) {
        //@ts-expect-error keyname is varies
        state.participant[keyName] = value;
      }
    },
    setCriteria: (state, action) => {
      state.criteriaRanking = action.payload;
    },

    setCriterionImportacy: (state, action) => {
      const { subject, value, comparand } = action.payload;
      if (!state.criteriaRanking) return;
      state.criteriaRanking[subject][comparand].importancy = value;
    },
    setCriterionScale: (state, action) => {
      const { subject, value, comparand } = action.payload;
      if (!state.criteriaRanking) return;
      state.criteriaRanking[subject][comparand].scale = value as Scale;
    },
    setCriterion: (state, action) => {
      const criterion = action.payload;
      if (!state.criteriaRanking) return;
      const exisiting = Object.keys(state.criteriaRanking);
      const lastIx = exisiting.length - 1;
      const lastCriterion = exisiting[lastIx];
      const lastComparand = Object.keys(
        state.criteriaRanking[lastCriterion],
      )[0];

      for (let i = 0; i < exisiting.length; i++) {
        const item = exisiting[i];
        state.criteriaRanking[item][criterion] = {
          // @ts-expect-error importancy initially empty
          importancy: '',
          // @ts-expect-error scale initially empty
          scale: '',
          owner: 'User Defined',
        };
      }
      // @ts-expect-error lastComparand is always defined
      state.criteriaRanking[lastComparand] = {
        [criterion]: {
          importancy: '',
          scale: '',
          owner: 'User Defined',
        },
      };
    },
    setCriteriaLookup: (state, action) => {
      state.criteriaLookup = action.payload;
    },
    setConsistencyRatio: (state, action) => {
      state.consistencyRatio = action.payload;
    },
    resetSurveyState: () => initialState,
  },
});

export const setCriteria = (payload: CriteriaTree) => ({
  payload,
  type: 'survey/setCriteria',
});

export const setParticipantValue = (payload: {
  keyName: string;
  value: string | number;
}) => ({
  payload,
  type: 'survey/setParticipantValue',
});

export const setCriterionImportancy = (payload: {
  subject: string;
  comparand: string;
  value: Importancy;
}) => ({
  payload,
  type: 'survey/setCriterionImportacy',
});

export const setCriterionScale = (payload: {
  subject: string;
  comparand: string;
  value: Scale;
}) => ({
  payload,
  type: 'survey/setCriterionScale',
});

export const setCriterion = (payload: string) => ({
  payload,
  type: 'survey/setCriterion',
});
export const setConsistencyRatio = (payload: ConsistencyRatio) => ({
  payload,
  type: 'survey/setConsistencyRatio',
});

export const resetSurveyState = () => ({ type: 'survey/resetSurveyState' });

export const setCriteriaLookup = (payload: Record<string, any>) => ({
  payload,
  type: 'survey/setCriteriaLookup',
});

export default surveyStore.reducer;
