import {Injectable, OnInit} from '@angular/core';
import {Actions, Effect, ofType, OnInitEffects} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {
    changeOldScorecardsToNewFormat,
    changeOldScorecardsToNewFormatFailure,
    completeScorecardMigration,
    loadOldScorecards,
    loadOldScorecardsFailure,
    updateMigrationStatus,
} from '../actions/scorecard-data-migration.actions';
import {ScorecardMigrationService} from '../../core/services/scorecard-migration.service';
import {State} from '../reducers';
import {
    getMessageForMigrationProgressStatus,
    getProgressValueForMigrationProgressStatus
} from '../../core/helpers/conversion/get-data-for-migration-progress-status.helper';
import {ScorecardMigrationStage, ScorecardMigrationSummary} from '../../core/models/scorecard-migration.model';


@Injectable()
export class ScorecardDataMigrationEffects implements OnInitEffects {


  @Effect()
  loadOldScorecards(): Observable<Action> {
    return this.actions$.pipe(
      ofType(loadOldScorecards),
      mergeMap(() =>
        this.scorecardMigration.getOldScorecards().pipe(
          map((data: any[]) => {
            if (data && data.length) {
                const message = getMessageForMigrationProgressStatus(ScorecardMigrationStage.OLD_SCORECARDS_PRESENT, data.length);
                const progressValue = getProgressValueForMigrationProgressStatus(ScorecardMigrationStage.OLD_SCORECARDS_PRESENT);
                this.store.dispatch(updateMigrationStatus({notificationType: 'PROGRESS', message, progressValue}));
                console.log({data});
                return changeOldScorecardsToNewFormat({ data });
            } else {
                const message = getMessageForMigrationProgressStatus(ScorecardMigrationStage.NONE_OLD_SCORECARD_PRESENT);
                const progressValue = getProgressValueForMigrationProgressStatus(ScorecardMigrationStage.NONE_OLD_SCORECARD_PRESENT);
                return updateMigrationStatus({notificationType: 'COMPLETE', message, progressValue});
            }

          }),
          catchError((error) => {
              const message = getMessageForMigrationProgressStatus(ScorecardMigrationStage.ERROR_LOADING_OLD_SCORECARDS);
              const progressValue = getProgressValueForMigrationProgressStatus(ScorecardMigrationStage.ERROR_LOADING_OLD_SCORECARDS);
              this.store.dispatch(updateMigrationStatus({notificationType: 'ERROR', message, progressValue}));
            return of(loadOldScorecardsFailure({ error }));
          })
        )
      )
    );
  }
  @Effect({ dispatch: false })
  changeOldScorecardToNewFormat(): Observable<Action> {
    return this.actions$.pipe(
      ofType(changeOldScorecardsToNewFormat),
      tap((action) => {
          const message = getMessageForMigrationProgressStatus(ScorecardMigrationStage.START_MIGRATION);
          const progressValue = getProgressValueForMigrationProgressStatus(ScorecardMigrationStage.START_MIGRATION);
          this.store.dispatch(updateMigrationStatus({notificationType: 'PROGRESS', message, progressValue}));
        this.scorecardMigration.formatOldScorecard(action.data).then(
            (summary) => {
                console.log({ summary });
               // return this.store.dispatch(completeScorecardMigration({ summary }));
            }
        );
      }),
      catchError((error) => {
          const message = error && error.message ? error.message : 'Error occurred while performing Scorecard data migration';
               const summary: ScorecardMigrationSummary = {message};
               this.store.dispatch(completeScorecardMigration({ summary }));
              return of(changeOldScorecardsToNewFormatFailure({error}));
          }
      )
    );
  }
    // @Effect({ dispatch: false })
    // updateMigrationStatusProcess(): Observable<Action> {
    //     return this.actions$.pipe(
    //         ofType(updateMigrationStatus),
    //         mergeMap((action) => {
    //
    //             if (action && action.progressValue
    //                          && action.progressValue === 100
    //             && action.progressValue > 100 ) {
    //                 return of(changeOldScorecardsToNewFormat);
    //             }
    //         }),
    //         catchError((error) =>
    //             of(changeOldScorecardsToNewFormatFailure({ error }))
    //         )
    //     );
    // }
    ngrxOnInitEffects() {
        return loadOldScorecards();
    }
    constructor(
        private actions$: Actions,
        private scorecardMigration: ScorecardMigrationService,
        private store: Store<State>
    ) {}
}
