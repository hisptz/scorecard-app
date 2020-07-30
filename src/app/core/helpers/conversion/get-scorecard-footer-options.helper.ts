import { ScorecardFooterOptions } from '../../models/scorecard.model';

export function getScorecardFooterOptions(
  scorecardFooter
): ScorecardFooterOptions {
  const scorecardFooterOptions: ScorecardFooterOptions = {};
  if (scorecardFooter) {
    scorecardFooterOptions['showTitle'] = scorecardFooter.display_title
      ? true
      : false;
    scorecardFooterOptions[
      'showGeneratedDate'
    ] = scorecardFooter.display_generated_date ? true : false;
  }
  return scorecardFooterOptions;
}
