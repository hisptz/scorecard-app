import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScorecardService {

  constructor(private http$: HttpClient) { }
  getOldScorecardById(id: string) {
    return this.http$.get(`/api/dataStore/scorecards/${id}`).pipe(
        catchError((error) => throwError(error))
    );
  }
  deleteOldScorecard(id) {
    return this.http$.delete(`/api/dataStore/scorecards/${id}`).pipe(
        catchError((error) => throwError(error))
    );
  }
  createScorecardListItem(item) {
    return item && item.id ?  this.http$.post(`/api/dataStore/scorecard-list/${item.id}`, item).pipe(
        catchError((error) => throwError(error))
    ) : throwError({ message: 'Failed to save new scorecard list item', status: 'FAIL'});
  }
  createScorecardDetailsItem(scorecard) {
    return scorecard && scorecard.id ?  this.http$.post(`/api/dataStore/scorecard-details/${scorecard.id}`, scorecard).pipe(
        catchError((error) => throwError(error))
    ) : throwError({ message: 'Failed to save new scorecard details item', status: 'FAIL'});
  }
}
