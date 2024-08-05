import {DateFacet as HeadlessDateFacet, DateFacetValue} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';
import dayjs from 'dayjs';

interface DateFacetProps {
  controller: HeadlessDateFacet;
  title: string;
}

const DateFacet: FunctionComponent<DateFacetProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  const format = (dateStr: string) => {
    return dayjs(dateStr, 'YYYY/MM/DD@HH:mm:ss').format('MMMM D YYYY'); 
  };

  const getKeyForRange = (value: DateFacetValue) => {
    return `[${value.start}..${value.end}${value.endInclusive ? ']' : '['}`; 
  };

  if (!state.values.length) {
    return (
      <div className="date-facet">
        <h3>{props.title}</h3>
        <div>No facet values</div>
      </div>
    );
  }

  return (
    <div className="date-facet">
      <h3>{props.title}</h3>
      <ul>
        {state.values.map((value) => (
          <li key={getKeyForRange(value)}>
            <input
              type="checkbox"
              checked={controller.isValueSelected(value)}
              onChange={() => controller.toggleSelect(value)}
              disabled={state.isLoading}
            />
            {format(value.start)} to {format(value.end)}{' '}
            {value.endInclusive ? 'inclusively' : 'exclusively'} (
            {value.numberOfResults}{' '}
            {value.numberOfResults === 1 ? 'result' : 'results'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateFacet;