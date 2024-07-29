import { useState, useEffect, FunctionComponent } from "react";
import { ResultList as ResultListController } from "@coveo/headless";
import { InteractiveResult } from "./Interative-result";

interface ResultListProps {
  controller: ResultListController;
}

const ResultList: FunctionComponent<ResultListProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );
  if (!state.results.length) {
    return <div>No results</div>;
  }

  return (
    <div className="result-list">
      <ul>
        {state.results.map((result) => (
          <li key={result.uniqueId}>
            <article>
              <InteractiveResult result={result}>
                <h2>{result.title}</h2>
              </InteractiveResult>
              <p>{result.excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;
