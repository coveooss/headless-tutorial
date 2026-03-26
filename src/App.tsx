import { useEffect } from "react";
import Facet from "./components/Facet";
import ResultList from "./components/ResultList";
import SearchBox from "./components/SearchBox";

import {
	facet as FacetController,
	resultList as ResultListController,
	searchBox as SearchBoxController,
	sort as SortController,
} from "./controllers/controllers";
import "./App.css";

import { criteria, Sort } from "./components/Sort";
import { headlessEngine } from "./Engine";

let didInit = false;

function App() {
	useEffect(() => {
		if (!didInit) {
			didInit = true;
			headlessEngine.executeFirstSearch();
		}
	}, []);

	return (
		<>
			<h1>Coveo Headless Search Interface</h1>
			<div className="search-section">
				<SearchBox controller={SearchBoxController} />
			</div>
			<div className="main-section">
				<div className="facet-section column">
					<Facet controller={FacetController} title="Source" />
				</div>
				<div className="results-section column">
					<Sort controller={SortController} criteria={criteria} />
					<ResultList controller={ResultListController} />
				</div>
			</div>
		</>
	);
}

export default App;
