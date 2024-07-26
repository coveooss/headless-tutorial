import { SearchBox as SearchBoxController } from "@coveo/headless";
import { useEffect, useState, FunctionComponent } from 'react';

interface SearchBoxProps {
  controller: SearchBoxController;
}
const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  return (
    <div className="search-box">
      <input
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && controller.submit()}
      />
    </div>
  );
}

export default SearchBox;