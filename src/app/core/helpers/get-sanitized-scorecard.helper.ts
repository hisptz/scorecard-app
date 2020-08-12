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
export function getSanitizedScorecard(oldScorecard, id: string): Scorecard {
  let scorecard: Scorecard = {
    id: '',
    name: '',
    title: '',
    legendDefinitions: [],
    dataSelection: null,
    orgUnitSelection: null,
    options: null,
    periodSelection: null,
    highlightedIndicators: null,
    publicAccess: '',
    userGroupAccesses: [],
    userAccesses: [],
    user: {
      id: ''
    },
  };
  if (oldScorecard) {
    scorecard = {...scorecard, id, customHeader: '', ...getScorecardAccess(oldScorecard?.user_groups)};
    const headerData = oldScorecard.header
      ? getHeaderData(oldScorecard.header)
      : {};
    scorecard = { ...scorecard, ...headerData };
    scorecard.legendDefinitions = oldScorecard.legendset_definitions
      ? getLegendDefinitions(oldScorecard.legendset_definitions)
      : [];
    scorecard.periodSelection = oldScorecard.selected_periods
      ? getPeriodSelectionData(oldScorecard.selected_periods)
      : getPeriodSelectionData([]);
    scorecard.userAccesses = [];
    scorecard.orgUnitSelection =
      oldScorecard.orgunit_settings &&
      oldScorecard.orgunit_settings.selected_orgunits
        ? getOrgunitSelection(oldScorecard.orgunit_settings.selected_orgunits)
        : getOrgunitSelection([]);
    scorecard.options = getScorecardOptions(oldScorecard);
    scorecard.user = oldScorecard.user ? oldScorecard.user : { user: '' };
    scorecard.dataSelection = getDataSelection(oldScorecard?.data_settings);
    return scorecard;
  }
  return null;
}
