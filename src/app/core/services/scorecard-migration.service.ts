import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, take} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { getSanitizedScorecard } from '../helpers/get-sanitized-scorecard.helper';
import {getScorecardListItem} from '../helpers/get-scorecard-list-item.helper';
import {ScorecardService} from './scorecard.service';

@Injectable({
  providedIn: 'root'
})
export class ScorecardMigrationService {

  constructor(private http$: HttpClient, private scorecardService: ScorecardService) { }
  getOldScorecards() {
    return this.http$.get('/api/dataStore/scorecards').pipe(
      catchError((error) => throwError(error))
    );
  }

    createScorecardListItem(scorecard) {
        const item = getScorecardListItem(scorecard);
        return new Promise((resolve, reject) => {this.scorecardService.createScorecardListItem(item).pipe(take(1)).subscribe(
            (data) => {
                resolve(data);
            },
            (error) => {
                reject(error);
            },
        );
        });
    }
    createScorecardDetailsItem(scorecard) {
        return new Promise((resolve, reject) => {this.scorecardService.createScorecardDetailsItem(scorecard).pipe(take(1)).subscribe(
            (data) => {
                resolve(data);
            },
            (error) => {
                reject(error);
            },
        );
        });
    }
  getOldScorecardPromise(id: string) {
       return new Promise((resolve, reject) => {this.scorecardService.getOldScorecardById(id).pipe(take(1)).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        },
      );
       });
  }
 async getFormattedScorecard(ids: any[]) {
    const scorecardArr = [];
    if ( ids && ids.length) {
      for (const id of ids) {

        const oldScorecard = await this.getOldScorecardPromise(id);
        const newScorecard = getSanitizedScorecard(oldScorecard, id);
        if (newScorecard) {
            scorecardArr.push(newScorecard);
        }
      }
    }
    return scorecardArr;
  }

  async formatOldScorecard(ids: any[]) {
     const formattedScorecards = await this.getFormattedScorecard(ids);
      let scorecardListResponses = [];
      let scorecardDetailsResponses = [];
     if (formattedScorecards && formattedScorecards.length) {
        for (const scorecard of formattedScorecards) {
           const listResponse = await this.createScorecardListItem(scorecard).then(item => item).catch(error => error);
           const detailResponse = await this.createScorecardDetailsItem(scorecard).then(item => item).catch(error => error);
            scorecardListResponses = [...scorecardListResponses, listResponse];
            scorecardDetailsResponses = [...scorecardDetailsResponses, detailResponse];
        }
     }
     return {...{}, scorecardListResponses, scorecardDetailsResponses };
  }


}
