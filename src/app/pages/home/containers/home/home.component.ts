import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CardsService } from '../../../../core/services/cards.service';
import {
  fadeSmooth,
  visibilityChanged,
} from '../../../../shared/animations/animations';
import { ViewTypes } from '../../constants/view-types.constant';
import { TourService } from 'ngx-tour-core';
import {Store} from '@ngrx/store';
import {State} from '../../../../store/reducers';
import {loadOldScorecards} from '../../../../store/actions/scorecard-data-migration.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [visibilityChanged, fadeSmooth],
})
export class HomeComponent implements OnInit {
  nums: number;
  counter = 0;

  current_hovered_card = '';
  scorecards$: Object;
  config: any;
  count: any;
  filter: any;
  type: any = 'card';
  currentViewType: string;
  viewTypes: any;

  public labels: any = {};

  constructor(
    private cardService: CardsService,
    private router: Router,
    private tourService: TourService,
    private store: Store<State>
  ) {
    this.config = {
      itemsPerPage: 18,
      currentPage: 1,
      totalItems: this.count,
      itemsPerPageArr: [6, 12, 18],
    };
  }

  onPageChange(paginationConfig: any) {
    this.config = paginationConfig;
  }

  ngOnInit() {
    this.viewTypes = ViewTypes;
    this.currentViewType = ViewTypes.CARD;
    this.getScorecards();
  }
  getScorecards() {
    this.scorecards$ = this.cardService.getCards();
  }
  onCreateNew() {
    this.router.navigate(['create']);
  }
  getViewType(event) {
    if (event) {
      this.type = event;
    } else {
      this.type = 'list';
    }
  }
  viewScorecard() {
    this.router.navigate(['/view']);
  }

  onChangeView(viewType: string) {
    this.currentViewType = viewType;
  }

  getSearchFilter(event) {
    this.filter = event;
  }
  mouseEnter(scorecardId) {
    this.current_hovered_card = scorecardId;
  }

  mouseLeave() {
    this.current_hovered_card = '';
  }

  onView(id) {
    this.router.navigate(['/view']);
  }
}
