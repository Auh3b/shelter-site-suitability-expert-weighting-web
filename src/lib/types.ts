import { z, type ZodIssue } from 'zod';

export const ConsistencyRatioSchema = z
  .number()
  .max(0.1, 'Consistency Ratio showed be less than 0.1');

export const CriterionSupabaseSchema = z.object({
  name: z.string(),
  label: z.string(),
  description: z.string(),
  id: z.number(),
});
export const CriteriaSupabaseSchema = z.record(
  z.string(),
  CriterionSupabaseSchema,
);

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

export const ImportancySchema = z.enum(['A', 'B'], {
  message: 'The expected value is either A or B.',
});
export const ScaleSchema = z.enum(
  ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  {
    message: 'Expected a value between 1 and 9',
  },
);
export const OwnerSchema = z.enum(['Predefined', 'User Defined']).optional();

export const CriterionNodeSchema = z.object({
  importancy: ImportancySchema,
  scale: ScaleSchema,
  owner: OwnerSchema,
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
  formSubmitted: z.boolean(),
  submittedTries: z.number(),
  presetId: z.string().optional(),
});

export const SurveyStateSchema = z.object({
  participant: ParticipantSchema,
  criteriaRanking: CriteriaTreeSchema.optional(),
  criteriaLookup: CriteriaSupabaseSchema.optional(),
  consistencyRatio: ConsistencyRatioSchema.optional(),
});

export const RootStateSchema = z.object({
  page: PageStateSchema,
  survey: SurveyStateSchema,
});

export type Importancy = z.infer<typeof ImportancySchema>;
export type Scale = z.infer<typeof ScaleSchema>;
export type Owner = z.infer<typeof OwnerSchema>;
export type Criteria = z.infer<typeof CriteriaSchema>;
export type Criterion = z.infer<typeof CriterionSchema>;
export type Citation = z.infer<typeof CitationSchema>;
export type CriteriaTree = z.infer<typeof CriteriaTreeSchema>;
export type CriterionNodes = z.infer<typeof CriterionNodesSchema>;
export type CriterionNode = z.infer<typeof CriterionNodeSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type ConsistencyRatio = z.infer<typeof ConsistencyRatioSchema>;
export type PageState = z.infer<typeof PageStateSchema> & {
  errors: ZodIssue[] | null;
};
export type SurveyState = z.infer<typeof SurveyStateSchema>;
export interface RootState {
  page: PageState;
  survey: SurveyState;
}

export type CriteriaSupabase = z.infer<typeof CriteriaSupabaseSchema>;
export type CriterionSupabase = z.infer<typeof CriterionSupabaseSchema>;
