import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  filter: any;
  type = 'card';
  nums: number;
  counter = 0;
  @Output() viewType = new EventEmitter<string>();
  @Output() searchFilter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
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
    this.viewType.emit(this.type);
  }
  sendSearchText(event) {
    this.searchFilter.emit(this.filter);
  }

}
