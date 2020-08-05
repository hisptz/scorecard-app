import { createAction, props } from '@ngrx/store';
import {ScorecardMigrationSummary} from '../../core/models/scorecard-migration.model';

export const loadOldScorecards = createAction(
  '[ScorecardDataMigration] Load Old Scorecards'
);

export const loadOldScorecardsSuccess = createAction(
  '[ScorecardDataMigration] Load Old Scorecards Success',
  props<{ data: any }>()
);

export const loadOldScorecardsFailure = createAction(
  '[ScorecardDataMigration] Load Old Scorecards Failure',
  props<{ error: any }>()
);

export const changeOldScorecardsToNewFormat = createAction(
    '[ScorecardDataMigration] Change Old Scorecard To new Scorecard',
    props<{ data: any }>()
);
export const changeOldScorecardsToNewFormatSuccess = createAction(
    '[ScorecardDataMigration] Change Old Scorecard To new Scorecard Success',
    props<{ data: any }>()
);
export const changeOldScorecardsToNewFormatFailure = createAction(
    '[ScorecardDataMigration] Change Old Scorecard To new Scorecard Failure',
    props<{ error: any }>()
);
export const updateMigrationStatus = createAction('[ScorecardDataMigration] Update Migration Status',
    props<{ notificationType: string, message: string, progressValue: number }>()
);
export const completeScorecardMigration = createAction('[ScorecardDataMigration] Complete Scorecard Migration',
                                                      props<{ summary: ScorecardMigrationSummary}>());
