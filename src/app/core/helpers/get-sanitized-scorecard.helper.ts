import {
  Scorecard,
  Legend,
  PeriodSelection,
  ScorecardAccess,
  OrgUnitSelection,
  ScorecardOptions,
} from '../models/scorecard.model';
import { getHeaderData } from './conversion/get-header-data.helper';
import { getPeriodSelectionData } from './conversion/get-period-selection-data.helper';
import { getLegendDefinitions } from './conversion/get-legend-definitions.helper';
import { getScorecardAccess } from './conversion/get-scorecard-access.helper';
import { getOrgunitSelection } from './conversion/get-orgunit-selection.helper';
import { getScorecardOptions } from './conversion/get-scorecard-options.helper';
import { getDataSelection } from './conversion/get-data-selection.helper';
export function getSanitizedScorecard(oldScorecard, id) {
  if (oldScorecard) {
    const headerData = oldScorecard.header
      ? getHeaderData(oldScorecard.header)
      : {};
    const legendDefinitions: Legend[] = oldScorecard.legendset_definitions
      ? getLegendDefinitions(oldScorecard.legendset_definitions)
      : [];
    const periodSelection: PeriodSelection = oldScorecard.selected_periods
      ? getPeriodSelectionData(oldScorecard.selected_periods)
      : getPeriodSelectionData([]);
    const userGroupAccesses: ScorecardAccess[] = oldScorecard.user_groups
      ? getScorecardAccess(oldScorecard.user_groups)
      : [];
    const userAccesses: ScorecardAccess[] = [];
    const orgUnitSelection: OrgUnitSelection =
      oldScorecard.orgunit_settings &&
      oldScorecard.orgunit_settings.selected_orgunits
        ? getOrgunitSelection(oldScorecard.orgunit_settings.selected_orgunits)
        : getOrgunitSelection([]);
    const options: ScorecardOptions = getScorecardOptions(oldScorecard);
    const user = oldScorecard.user ? oldScorecard.user : { user: '' };
    const dataSelection = getDataSelection(oldScorecard?.data_settings);
    return {
      ...headerData,
      legendDefinitions,
      periodSelection,
      userGroupAccesses,
      userAccesses,
      orgUnitSelection,
      options,
      user,
      dataSelection, id
    };
  }
}
