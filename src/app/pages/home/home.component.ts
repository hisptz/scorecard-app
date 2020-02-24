import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../core/services/cards.service';
import { repeat } from 'rxjs/operators';
import {fadeSmooth, visibilityChanged} from '../../shared/animations/animations';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    visibilityChanged,
    fadeSmooth
  ]
})
export class HomeComponent implements OnInit {

  nums:number;
  counter:number=0;

  current_hovered_card = '';
  scorecards: Object;
  config: any;
  count: any;
  filter:any;
  type:any ="card";


  public labels: any = {};

  constructor(private data: CardsService, private router: Router) {

    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.count
    };
  }
 
  pageChanged(event){
    this.config.currentPage = event.pageIndex + 1;
   }

  ngOnInit() {
    this.data.getCards().subscribe((data: any) => {
      this.scorecards = data;
      this.config.totalItems = data.length;
    }
  );
  }
  createNew() {
     this.router.navigate(['create']);
  }
  changeView() {
    if(this.counter > 2){
      this.counter = 0;
    }
    this.nums=this.counter += 1;
    switch (this.nums) {
      case 1:
        this.type = "list";
          break;
       case 2:
          this.type = "thumbnails";
        break;
        case 3:
          this.type = "card";
        break;
    }
  }
  mouseEnter(scorecardId) {
    this.current_hovered_card = scorecardId;
  }

  mouseLeave() {
    this.current_hovered_card = '';
  }
}
