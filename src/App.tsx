import { useEffect } from 'react'
import SearchBox from "./components/SearchBox";
import Facet from "./components/Facet";
import ResultList from "./components/ResultList";
import Pager from "./components/Pager";
import DateFacet from "./components/DateFacet"
import { pager as PagerController, resultList, dateFacet as dateFacetController  } from './controllers/controllers';

import {
  searchBox as SearchBoxController,
  facet as FacetController,
  resultList as ResultListController,
  sort as SortController,
} from './controllers/controllers'
import './App.css'

import { headlessEngine } from "./Engine";
import { criteria, Sort } from './components/Sort';
import { resultTemplatesManager } from './controllers/ResultTemplatesManager';

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
            <DateFacet controller={dateFacetController} title="Date" />
          </div>
          <div className="results-section column">
            <Sort controller={SortController} criteria={criteria}/>
            <ResultList 
              controller={ResultListController} 
              resultTemplatesManager={resultTemplatesManager}
            />
            <Pager controller={PagerController} />
          </div>
      </div>
    </>
  )
}

export default App;
