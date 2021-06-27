import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ScorecardMigrationNotification, ScorecardMigrationStage} from '../../core/models/scorecard-migration.model';
import {completeScorecardMigration, loadOldScorecards, updateMigrationStatus} from '../actions/scorecard-data-migration.actions';
import {getMessageForMigrationProgressStatus} from '../../core/helpers/conversion/get-data-for-migration-progress-status.helper';


export const scorecardDataMigrationFeatureKey = 'scorecardDataMigration';

export interface ScorecardDataMigrationState extends EntityState<any> {
   loading: boolean;
   notification: ScorecardMigrationNotification;
   summary: any;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: ScorecardDataMigrationState = adapter.getInitialState({
 loading: false,
   notification: null,
    summary: null
});


export const scorecardDataMigrationReducer = createReducer(
  initialState,
  on(loadOldScorecards, (state) => {
      const message = getMessageForMigrationProgressStatus(ScorecardMigrationStage.CHECK_OLD_SCORECARDS);
     return {...state,
             loading: true,
             notification: {notificationType: 'PROGRESS',
                            message,
                            progressValue: 0 }};
  }),
    on(updateMigrationStatus, (state, {notificationType, message, progressValue}) => {
        return {
            ...state,
            notification: {
                notificationType,
                message,
                progressValue
            }
        };
    }),
    on(completeScorecardMigration, (state, { summary}) => {
        const message = summary && summary.message ? summary.message : 'Scorecard data migration has completed';
        return {
            ...state,
            summary,
            loading: false,
        };
    })
);

