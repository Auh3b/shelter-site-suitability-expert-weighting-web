export interface Criteria {
  [k: string]: Criterion;
}

export interface Criterion {
  name: string;
  citation: Citation;
}

interface Citation {
  authors: string;
  url?: string;
}

export const criteria: Criteria = {
  buildings: {
    name: 'Buidings',
    citation: {
      authors: '',
    },
  },
  elevation: {
    name: 'Elevation',
    citation: {
      authors: '',
    },
  },
  floodData: {
    name: 'Flood Data',
    citation: {
      authors: '',
    },
  },
  landUse: {
    name: 'Land Use',
    citation: {
      authors: '',
    },
  },
  population: {
    name: 'Population',
    citation: {
      authors: '',
    },
  },
  roads: {
    name: 'Roads',
    citation: {
      authors: '',
    },
  },
  slope: {
    name: 'Slope',
    citation: {
      authors: '',
    },
  },
};

const criterionList = Object.keys(criteria);
const endIx = criterionList.length - 1;

export interface CriteriaTree {
  [k: string]: CriterionNodes;
}

export interface CriterionNodes {
  [k: string]: CriteriaNode;
}

export interface CriteriaNode {
  importancy: string;
  scale: string | number;
  owner: 'Predefined' | 'User Defined';
}

export const criteriaSurveyTree: CriteriaTree = Object.entries(
  criteria,
).reduce<CriteriaTree>((prev, [criterion], ix) => {
  if (ix === endIx) return prev;
  prev[criterion] = criterionList
    .slice(ix + 1)
    .reduce<CriterionNodes>((set, currCriterion) => {
      set[currCriterion] = {
        importancy: '',
        scale: 0,
        owner: 'Predefined',
      };
      return set;
    }, {});
  return prev;
}, {});

export const importancyValue: string[] = ['A', 'B'];
export const intensityValue: number[] = Array(9)
  .fill(0)
  .map((_k, i) => i + 1);
