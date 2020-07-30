import { ScorecardDisplayOptions } from '../../models/scorecard.model';

export function getScorecardDisplayOptions(scorecard): ScorecardDisplayOptions {
    const scorecardDisplayOptions: ScorecardDisplayOptions = {};
    if (scorecard) {
      scorecardDisplayOptions['showAverageInRow'] = scorecard.show_average_in_row
        ? true
        : false;
      scorecardDisplayOptions[
        'showAverageInColumn'
      ] = scorecard.show_average_in_column ? true : false;
      scorecardDisplayOptions['showLeagueTable'] = scorecard.show_league_table
        ? true
        : false;
      scorecardDisplayOptions[
        'showLeagueTableAll'
      ] = scorecard.show_league_table_all ? true : false;
      scorecardDisplayOptions['showScore'] = scorecard.show_score ? true : false;
      scorecardDisplayOptions['showRank'] = scorecard.show_rank ? true : false;
      scorecardDisplayOptions['showHierarchy'] = scorecard.show_hierarchy
        ? true
        : false;
      scorecardDisplayOptions['showDataInColumn'] = scorecard.show_data_in_column
        ? true
        : false;
    }

    return scorecardDisplayOptions;
  }
