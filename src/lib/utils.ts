import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SurveyStateSchema, type SurveyState } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateSubmission = (input: SurveyState) => {
  return SurveyStateSchema.safeParse(input);
};
