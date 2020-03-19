import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TourService } from 'ngx-tour-core';

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.css']
})
export class InfoMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(public tourService: TourService) {}
  tourStart = false;

  @Output() tourEvent = new EventEmitter<boolean>();

  ngOnInit() {}
  handleQnMenu(op: string) {
    if (op === 'open') {
      this.trigger.openMenu();
    } else {
      this.trigger.closeMenu();
    }
  }

  startTour() {
    this.tourStart = true;
    this.tourEvent.emit(this.tourStart);
  }
}
