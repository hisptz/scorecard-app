import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CardsService } from '../../../../core/services/cards.service';
import {
  fadeSmooth,
  visibilityChanged
} from '../../../../shared/animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [visibilityChanged, fadeSmooth]
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

  public labels: any = {};

  constructor(private cardService: CardsService, private router: Router) {
    this.config = {
      itemsPerPage: 12,
      currentPage: 1,
      totalItems: this.count,
      itemsPerPageArr: [6, 12, 18]
    };
  }

  pageChanged(event) {
    this.config.itemsPerPage = event.pageSize;
    this.config.currentPage = event.pageIndex + 1;
  }

  ngOnInit() {
    this.getScorecards();
  }
  getScorecards() {
    this.scorecards$ = this.cardService.getCards();
  }
  createNew() {
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
  changeView() {
    if (this.counter > 2) {
      this.counter = 0;
    }
    this.nums = this.counter += 1;
    switch (this.nums) {
      case 1:
        this.type = 'list';
        break;
      case 2:
        this.type = 'thumbnails';
        break;
      case 3:
        this.type = 'card';
        break;
    }
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
}
