import { ScorecardDisplayOptions } from '../../models/scorecard.model';

export function getScorecardDisplayOptions(scorecard): ScorecardDisplayOptions {
  let scorecardDisplayOptions: ScorecardDisplayOptions = {};
  if (scorecard) {
    const showAverageInRow = scorecard.show_average_in_row ? true : false;
    const showAverageInColumn = scorecard.show_average_in_column ? true : false;
    const showLeagueTable = scorecard.show_league_table ? true : false;
    const showLeagueTableAll = scorecard.show_league_table_all ? true : false;
    const showScore = scorecard.show_score ? true : false;
    const showRank = scorecard.show_rank ? true : false;
    const showHierarchy = scorecard.show_hierarchy ? true : false;
    const showDataInColumn = scorecard.show_data_in_column ? true : false;
    scorecardDisplayOptions = {
      ...scorecardDisplayOptions,
      showAverageInColumn,
      showAverageInRow,
      showDataInColumn,
      showHierarchy,
      showLeagueTable,
      showLeagueTableAll,
      showRank,
      showScore,
    };
  }
  return scorecardDisplayOptions;
}
