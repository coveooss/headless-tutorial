import {
  buildCriterionExpression,
  Sort as HeadlessSort,
  SortCriterion,
  buildRelevanceSortCriterion,
  buildDateSortCriterion,
  SortOrder,
  buildFieldSortCriterion,
} from '@coveo/headless';
import { useEffect, useState, FunctionComponent } from 'react';
 
interface SortProps {
  controller: HeadlessSort;
  criteria: [string, SortCriterion][];
}
 
export const Sort: FunctionComponent<SortProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);
 
  useEffect(() => controller.subscribe(() => setState(controller.state)), [controller]);
 
  const getCriterionFromName = (name: string) =>
    props.criteria.find(([criterionName]) => criterionName === name)!;
 
  const getCurrentCriterion = () =>
    props.criteria.find(
      ([, criterion]) =>
        state.sortCriteria === buildCriterionExpression(criterion)
    )!;
 
  return (
    <div className="sort">
      <p>Sort by:&nbsp;</p>
      <select
        value={getCurrentCriterion()[0]}
        onChange={(e) =>
          controller.sortBy(getCriterionFromName(e.target.value)[1])
        }
        >
        {props.criteria.map(([criterionName]) => (
          <option key={criterionName} value={criterionName}>
            {criterionName}
          </option>
        ))}
      </select>
    </div>
  );
};

export const criteria: [string, SortCriterion][] = [
  ['Relevance', buildRelevanceSortCriterion()],
  ['Date (Ascending)', buildDateSortCriterion(SortOrder.Ascending)],
  ['Date (Descending)', buildDateSortCriterion(SortOrder.Descending)],
  ['Size (Ascending)', buildFieldSortCriterion('size', SortOrder.Ascending)],
  ['Size (Descending)', buildFieldSortCriterion('size', SortOrder.Descending)],
];