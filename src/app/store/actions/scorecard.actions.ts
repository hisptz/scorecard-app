import { createAction, props } from '@ngrx/store';

export const loadScorecards = createAction(
  '[Scorecard] Load Scorecards'
);

export const loadScorecardsSuccess = createAction(
  '[Scorecard] Load Scorecards Success',
  props<{ data: any }>()
);

export const loadScorecardsFailure = createAction(
  '[Scorecard] Load Scorecards Failure',
  props<{ error: any }>()
);
export const loadScorecard = createAction(
  '[Scorecard] Load Scorecard',
  props<{ id: string }>()
);

export const loadScorecardSuccess = createAction(
  '[Scorecard] Load Scorecard Success',
  props<{ data: any }>()
);

export const loadScorecardFailure = createAction(
  '[Scorecard] Load Scorecard Failure',
  props<{ error: any }>()
);