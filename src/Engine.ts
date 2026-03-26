import {
	buildSearchEngine,
	getSampleSearchEngineConfiguration,
	loadFieldActions,
	SearchEngine,
} from "@coveo/headless";

const FIELDS = ["ec_images"];

const registerAdditionalFields = (headlessEngine: SearchEngine) => {
	const fieldActions = loadFieldActions(headlessEngine);
	headlessEngine.dispatch(fieldActions.registerFieldsToInclude(FIELDS));
	return headlessEngine;
};

const buildEngine = buildSearchEngine({
	configuration: getSampleSearchEngineConfiguration(),
});

export const headlessEngine = registerAdditionalFields(buildEngine);
