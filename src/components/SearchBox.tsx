import { SearchBox as SearchBoxController } from "@coveo/headless";
import { useEffect, useState, FunctionComponent } from 'react';

interface SearchBoxProps {
  controller: SearchBoxController;
}
const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  const suggestionStyle = {
    cursor: 'pointer',
  };
  
  return (
    
    <div className="search-box">
      <input
        placeholder="Search..."
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            controller.submit();
          } else if (e.key === 'Escape') {
            controller.clear();
            (e.target as HTMLInputElement).blur();
          }
        }}      
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button onClick={() => controller.submit()}>Search</button>
      <button onClick={() => controller.clear()}>Clear</button>

      {state.suggestions.length > 0 && ( 
        <ul>
        {focused && state.suggestions.map((suggestion) => {
          return (
            <li
              style={suggestionStyle}
              key={suggestion.rawValue}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => controller.selectSuggestion(suggestion.rawValue)}
              dangerouslySetInnerHTML={{__html: suggestion.highlightedValue}}
            ></li>
          );
        })}
      </ul>
      )}
    </div>
  );}

export default SearchBox;