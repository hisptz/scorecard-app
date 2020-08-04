import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
    loadOldScorecards,
    loadOldScorecardsSuccess,
    loadOldScorecardsFailure,
    changeOldScorecardsToNewFormat,
    changeOldScorecardsToNewFormatFailure, completeScorecardMigration,
} from '../actions/scorecard-data-migration.actions';
import { ScorecardMigrationService } from '../../core/services/scorecard-migration.service';
import { State } from '../reducers';

@Injectable()
export class ScorecardDataMigrationEffects {
  constructor(
    private actions$: Actions,
    private scorecardMigration: ScorecardMigrationService,
    private store: Store<State>
  ) {}

  @Effect()
  loadOldScorecards(): Observable<Action> {
    return this.actions$.pipe(
      ofType(loadOldScorecards),
      mergeMap(() =>
        this.scorecardMigration.getOldScorecards().pipe(
          map((data: any[]) => {
            if (data && data.length) {
                return changeOldScorecardsToNewFormat({ data });
            } else {
                return completeScorecardMigration();
            }

          }),
          catchError((error) => {
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
      mergeMap((action) => {
        this.scorecardMigration.formatOldScorecard(action.data).then(
            result => {
                console.log({result});
            }
        );
        return of(changeOldScorecardsToNewFormat);
      }),
      catchError((error) =>
        of(changeOldScorecardsToNewFormatFailure({ error }))
      )
    );
  }
}
