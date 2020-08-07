import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScorecardDataMigrationState, scorecardDataMigrationFeatureKey, adapter } from '../reducers/scorecard-data-migration.reducer';
import {getRootState} from '../reducers';
export const {
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
const getScorecardDataMigrationState = createFeatureSelector<ScorecardDataMigrationState>(scorecardDataMigrationFeatureKey);

export const getMigrationNotification = createSelector(getScorecardDataMigrationState,
                             (state) => state.notification);
export const getMigrationLoadingStatus = createSelector(getScorecardDataMigrationState,
    (state) => state.loading);

