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
  Population: {
    name: 'Population',
    citation: {
      authors: '',
    },
  },
  Roads: {
    name: 'Roads',
    citation: {
      authors: '',
    },
  },
  Slope: {
    name: 'Slope',
    citation: {
      authors: '',
    },
  },
};

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
