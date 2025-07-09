import type {
  CriteriaTree,
  CriterionNodes,
  CriterionSupabase,
} from '@/lib/types';

export const generateCriteriaSurveyTree = (
  input: CriterionSupabase[],
): CriteriaTree => {
  const criterionList = input.map(({ name }) => name);
  const endIx = criterionList.length - 1;
  const output = input.reduce<{ [key: string]: CriterionNodes }>(
    (prev, { name }, ix) => {
      if (ix === endIx) return prev;
      prev[name] = criterionList
        .slice(ix + 1)
        .reduce<CriterionNodes>((set, currCriterion) => {
          set[currCriterion] = {
            // @ts-expect-error defaults is invalid
            importancy: '',
            // @ts-expect-error defaults is invalid
            scale: '0',
            owner: 'Predefined',
          };
          return set;
        }, {});
      return prev;
    },
    {},
  );
  return output;
};

export const generateCriteriaLookup = (input: CriterionSupabase[]) => {
  return input.reduce<{ [key: string]: CriterionSupabase }>((prev, curr) => {
    prev[curr.name] = curr;
    return prev;
  }, {});
};

export const importancyValue: string[] = ['A', 'B'];
export const intensityValue: number[] = Array(9)
  .fill(0)
  .map((_k, i) => i + 1);
