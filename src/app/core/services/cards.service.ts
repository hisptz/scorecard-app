import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getScorecardListItem} from '../helpers/get-scorecard-list-item.helper';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get('assets/data.json');
  }
  getScorecardById(id = 'UFavu5CSkTy') {
    return this.http.get(`/api/dataStore/scorecards/${id}`); 
  }

}
