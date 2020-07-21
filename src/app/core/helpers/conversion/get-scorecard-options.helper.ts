import {
  ScorecardDisplayOptions,
  ScorecardOptions,
} from '../../models/scorecard.model';
import { getScorecardDisplayOptions } from './get-scorecard-display-options.helper';
import { getScorecardFooterOptions } from './get-scorecard-footer-options.helper';
import { getAverageDisplayType } from './get-average-display-type.helper';

export function getScorecardOptions(scorecard): ScorecardOptions {
  const scorecardOptions: ScorecardOptions = {
    isEditable: false,
    displayOptions: null,
  };
  if (scorecard) {
    scorecardOptions['isEditable'] = true;
    scorecardOptions['displayOptions'] = getScorecardDisplayOptions(scorecard);
    scorecardOptions['isRankPositionLast'] = scorecard.rank_position_last
      ? true
      : false;
    scorecardOptions['footerOptions'] = getScorecardFooterOptions(
      scorecard?.footer
    );
    scorecardOptions['averageDisplayType'] = getAverageDisplayType(
      scorecard?.average_selection
    );
  }

  return scorecardOptions;
}
