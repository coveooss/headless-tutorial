import {
	buildFacet,
	buildResultList,
	buildSearchBox,
	buildSort,
} from "@coveo/headless";
import { criteria } from "../components/Sort";
import { headlessEngine } from "../Engine";

export const searchBox = buildSearchBox(headlessEngine);
export const facet = buildFacet(headlessEngine, {
	options: { field: "source" },
});
export const resultList = buildResultList(headlessEngine);

const initialCriterion = criteria[0][1];
export const sort = buildSort(headlessEngine, {
	initialState: { criterion: initialCriterion },
});
