import type { CriteriaTree } from '@/data';

export interface RootState {
  survey: SurveyState;
  page: PageState;
}

export interface PageState {}

export interface SurveyState {
  participant: Participant;
  criteriaQuestion: CriteriaTree;
}

interface Participant {
  [k: string]: string | number | undefined;
}
