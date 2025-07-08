import { z, type ZodIssue } from 'zod';

export const CitationSchema = z.object({
  authors: z.string(),
  url: z.string().optional(),
  description: z.string().optional(),
});

export const CriterionSchema = z.object({
  name: z.string(),
  citation: CitationSchema,
});

export const CriteriaSchema = z.record(z.string(), CriterionSchema);

export const CriterionNodeSchema = z.object({
  importancy: z.enum(['A', 'B'], {
    message: 'The expected value is either A or B.',
  }),
  scale: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9'], {
    message: 'Expected a value between 1 and 9',
  }),
  owner: z.enum(['Predefined', 'User Defined']).optional(),
});

export const CriterionNodesSchema = z.record(z.string(), CriterionNodeSchema);

export const CriteriaTreeSchema = z.record(z.string(), CriterionNodesSchema);

export const ParticipantSchema = z.object({
  name: z.string().min(5),
  occupation: z.string().min(5),
  organisation: z.string().min(5),
  work_email: z.string().email(),
  alternative_email: z.string().email().optional(),
  phone: z
    .string()
    .min(7)
    .regex(/^\d*$/gm, { message: 'Should be made up of only numbers.' }),
});

export const PageStateSchema = z.object({
  consentFormOpen: z.boolean(),
  consentGiven: z.boolean(),
});

export const SurveyStateSchema = z.object({
  participant: ParticipantSchema,
  criteriaRanking: CriteriaTreeSchema,
});

export const RootStateSchema = z.object({
  page: PageStateSchema,
  survey: SurveyStateSchema,
});

export type Criteria = z.infer<typeof CriteriaSchema>;
export type Criterion = z.infer<typeof CriterionSchema>;
export type Citation = z.infer<typeof CitationSchema>;
export type CriteriaTree = z.infer<typeof CriteriaTreeSchema>;
export type CriterionNodes = z.infer<typeof CriterionNodesSchema>;
export type CriteriaNode = z.infer<typeof CriterionNodeSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type PageState = z.infer<typeof PageStateSchema> & {
  errors: ZodIssue[] | null;
};
export type SurveyState = z.infer<typeof SurveyStateSchema>;
export interface RootState {
  page: PageState;
  survey: SurveyState;
}
