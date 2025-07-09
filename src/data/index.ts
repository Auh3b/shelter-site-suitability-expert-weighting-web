import type { Criteria, CriteriaTree, CriterionNodes } from "@/lib/types";

export const criteria: Criteria = {
  buildings: {
    name: "Buidings",
    citation: {
      authors: "",
    },
  },
  elevation: {
    name: "Elevation",
    citation: {
      authors: "",
    },
  },
  floodData: {
    name: "Flood Data",
    citation: {
      authors: "",
    },
  },
  landUse: {
    name: "Land Use",
    citation: {
      authors: "",
    },
  },
  population: {
    name: "Population",
    citation: {
      authors: "",
    },
  },
  roads: {
    name: "Roads",
    citation: {
      authors: "",
    },
  },
  slope: {
    name: "Slope",
    citation: {
      authors: "",
    },
  },
};

const criterionList = Object.keys(criteria);
const endIx = criterionList.length - 1;

export const criteriaSurveyTree: CriteriaTree = Object.entries(
  criteria
).reduce<CriteriaTree>((prev, [criterion], ix) => {
  if (ix === endIx) return prev;
  prev[criterion] = criterionList
    .slice(ix + 1)
    .reduce<CriterionNodes>((set, currCriterion) => {
      set[currCriterion] = {
        // @ts-expect-error defaults is invalid
        importancy: "",
        // @ts-expect-error defaults is invalid
        scale: "0",
        owner: "Predefined",
      };
      return set;
    }, {});
  return prev;
}, {});

export const importancyValue: string[] = ["A", "B"];
export const intensityValue: number[] = Array(9)
  .fill(0)
  .map((_k, i) => i + 1);
