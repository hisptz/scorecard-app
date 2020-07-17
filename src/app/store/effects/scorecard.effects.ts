import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { defer, of, Observable } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { CardsService } from 'src/app/core/services/cards.service';
import { Scorecard } from 'src/app/core/models/scorecard.model';
import {
  loadScorecards,
  loadScorecardsSuccess,
  loadScorecardsFailure,
  loadScorecardSuccess,
  loadScorecard,
  loadScorecardFailure,
} from '../actions/scorecard.actions';
import { getSanitizedScorecard } from 'src/app/core/helpers/get-sanitized-scorecard.helper';

@Injectable()
export class ScorecardEffects {
  constructor(private actions$: Actions, private cardsService: CardsService) {}

  @Effect()
  getScorecards(): Observable<any> {
    return this.actions$.pipe(
      ofType(loadScorecards),
      mergeMap(() =>
        this.cardsService.getCards().pipe(
          map((data: any) => {
            return loadScorecardsSuccess({ data });
          }),
          catchError((error) => of(loadScorecardsFailure(error)))
        )
      )
    );
  }
  @Effect()
  getScorecard(): Observable<any> {
    return this.actions$.pipe(
      ofType(loadScorecard),
      mergeMap(() =>
        this.cardsService.getScorecardById().pipe(
          map((data: any) => {
            const newScorecard = getSanitizedScorecard(data);
            // console.log({ newScorecard });
            return loadScorecardSuccess({ data });
          }),
          catchError((error) => {
            console.log({ error });
            return of(loadScorecardFailure(error));
          })
        )
      )
    );
  }
}
