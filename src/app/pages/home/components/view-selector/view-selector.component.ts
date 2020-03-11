import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewTypes } from '../../constants/view-types.constant';

@Component({
  selector: 'app-view-selector',
  templateUrl: './view-selector.component.html',
  styleUrls: ['./view-selector.component.css']
})
export class ViewSelectorComponent implements OnInit {
  viewCounter: number;
  viewType: string;
  viewTypes: any;
  @Output() changeView: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {
    this.viewCounter = 0;
    this.viewTypes = ViewTypes;
    this.viewType = ViewTypes.CARD;
  }

  onChangeView() {
    if (this.viewCounter > 2) {
      this.viewCounter = 0;
    }
    this.viewCounter += 1;
    switch (this.viewCounter) {
      case 1:
        this.viewType = ViewTypes.LIST;
        break;
      case 2:
        this.viewType = ViewTypes.THUMBNAIL;
        break;
      case 3:
        this.viewType = ViewTypes.CARD;
        break;
    }

    this.changeView.emit(this.viewType);
  }
}
