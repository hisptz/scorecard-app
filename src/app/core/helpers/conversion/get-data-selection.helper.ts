import {
  DataSelection,
  ScorecardIndicatorGroup,
} from '../../models/scorecard.model';
import { getScorecardIndicatorGroups } from './get-scorecard-indicator-groups.helper';

export function getDataSelection(dataSettings): DataSelection {
  const indicatorGroups: ScorecardIndicatorGroup[] = [];
  const dataSelection: DataSelection = { indicatorGroups };
  if (dataSettings) {
    dataSelection.indicatorGroups = getScorecardIndicatorGroups(dataSettings);
  }
  return dataSelection;
}
