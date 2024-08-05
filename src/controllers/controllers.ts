import {
  buildSearchBox,
  buildResultList,
  buildFacet,
  buildSort,
  buildPager,
  buildDateFacet
} from "@coveo/headless";
import { criteria } from "../components/Sort";
import { headlessEngine } from "../Engine";

export const searchBox = buildSearchBox(headlessEngine, {
  options: {
    highlightOptions: {
      notMatchDelimiters: {
        open: '<strong>',
        close: '</strong>',
      },
      correctionDelimiters: {
        open: '<i>',
        close: '</i>',
      },
    },
  },
});

export const facet = buildFacet(headlessEngine, {
  options: { field: 'source', sortCriteria: 'score'}
});
export const resultList = buildResultList(headlessEngine);

const initialCriterion = criteria[0][1];
export const sort = buildSort(headlessEngine, {
  initialState: { criterion: initialCriterion },
});

export const pager = buildPager(headlessEngine);

export const dateFacet = buildDateFacet(headlessEngine, {
  options: {
    field: 'date',
    generateAutomaticRanges: true,
  }
});