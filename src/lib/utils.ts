import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  SurveyStateSchema,
  type CriteriaTree,
  type Participant,
  type SurveyState,
} from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateSubmission = (input: SurveyState) => {
  return SurveyStateSchema.safeParse(input);
};

export async function validateConsistencyRatio(input: {
  respondant: Participant;
  survey: CriteriaTree;
}) {
  const req = await fetch(
    'https://shelter-criteria-ranking-web-server.onrender.com/survey_response/',
    {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  const res = await req.json();
  return res;
}
